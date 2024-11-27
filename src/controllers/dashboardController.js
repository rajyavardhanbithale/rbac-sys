import Role from '../models/rolesModel.js';
import { Post } from '../models/postsModel.js';
import { Comment } from '../models/commentsModel.js';

export const dashboardStats = async (req, res) => {

    const user = req.user.id;

    try {
        const userRole = await Role.findById(user).populate('_id', 'name email');

        if (!userRole) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = {
            userInfo: {
                name: userRole._id.name,
                email: userRole._id.email
            },
            role: userRole.role,
            permissions: userRole.permissions
        };

        if (userRole.role === 'user') {
            const post = await Post.find({ authorID: user }, { comments: 0, updatedAt: 0 })
                .limit(5)
                .sort({ createdAt: -1 });
            return res.status(200).json({ userData, post });
        }

        const statsUsers = await Role.aggregate([
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    role: "$_id",
                    count: 1
                }
            }
        ]);

        let filteredStatsUser = statsUsers;
        if (userRole.role === 'moderator') {
            filteredStatsUser = statsUsers.filter(stat => stat.role !== 'admin');
        }


        const postCount = await Post.countDocuments();
        const commentsCount = await Comment.countDocuments();

        res.status(200).json({
            userData,
            filteredStatsUser,
            postCount,
            commentsCount
        });
    } catch (error) {
        res.status(500).json({ message: 'error fetching stats', error });
    }
}