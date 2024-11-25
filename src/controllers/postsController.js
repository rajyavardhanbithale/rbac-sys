import { Post } from "../models/postsModel.js";


export const createPosts = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.user;

        if (!title || !content) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const post = new Post({
            title,
            content,
            authorID: id,
        });

        await post.save();
        res.status(201).json({ message: "Post created successfully" });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('authorID', 'name email')

        post.comments = undefined;
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate('authorID', 'name email');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        await post.delete();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
