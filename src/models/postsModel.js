import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },

    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
});

export const Post = mongoose.model('Post', postSchema);