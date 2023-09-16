import express from 'express';
import { getFeedPosts, getUserPosts, likePost, createPost } from '../controllers/post.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", getUserPosts);

router.get("/createPost", verifyToken, createPost);
// update
router.patch("/:id/like", likePost);

export default router;