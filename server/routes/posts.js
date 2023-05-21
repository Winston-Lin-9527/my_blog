import express from "express";
import { editPost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// router.get("/", verifyToken, getFeedPosts); // don't need verification for getting the posts 
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/edit", verifyToken, editPost)

export default router;
