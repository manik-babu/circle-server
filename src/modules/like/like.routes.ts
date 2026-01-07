import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import likeController from "./like.controller";

//? /api/post/like
const router = Router();

router.put('/:postId', auth(UserRole.USER, UserRole.ADMIN), likeController.like);
router.get('/:postId', likeController.getLikedPeople);

export const likeRoute = router;