import { Post } from "../models/postsModel.js";

export default addComment = async (req, res) => {
    try {
        const { postId, content } = req.body;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = new Comment({
            postId,
            userId,
            content
        });

        await comment.save();
        res.status(201).json(comment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}