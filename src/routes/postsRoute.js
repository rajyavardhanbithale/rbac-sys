import express from "express";
import { createPosts, deletePost, getAllPost, getPost } from "../controllers/postsController.js";
import { addComment, getAllCommentsOfPost, removeComment } from "../controllers/commentsController.js";
import { accessAdmin, accessAdminAndMods, accessALL } from "../middleware/combinedMiddleware.js";

const router = express.Router();


router.post("/", accessALL, createPosts);
router.get("/", getAllPost);
router.get("/:id", getPost);
router.delete("/:id", accessAdmin, deletePost);

router.post("/comments", accessALL, addComment);
router.get("/comments/:id", getAllCommentsOfPost);
router.delete("/comments/:id", accessAdminAndMods, removeComment);

export default router;
