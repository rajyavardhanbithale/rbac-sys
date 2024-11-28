import { Post } from "../models/postsModel.js";
import { Comment } from "../models/commentsModel.js";

export const addComment = async (req, res) => {
    const { postId, content } = req.body;
    try {

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
        const updatePost = await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

        await Promise.all([comment.save(), updatePost.save()]);

        res.status(201).json(comment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllCommentsOfPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('comments')
            .populate({
                path: 'comments',
                select: 'content userId',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
            });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post.comments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const removeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const post = await Post.findById(comment.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const updatePost = await Post.findByIdAndUpdate(post._id, { $pull: { comments: comment._id } });

        await Comment.deleteOne({ _id: comment._id });

        res.status(200).json({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}