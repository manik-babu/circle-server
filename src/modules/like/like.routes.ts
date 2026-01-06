import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import likeController from "./like.controller";

//? /api/post/like
const router = Router();

router.put('/:postId', auth(UserRole.USER, UserRole.ADMIN), likeController.addLike)

export const likeRoute = router;