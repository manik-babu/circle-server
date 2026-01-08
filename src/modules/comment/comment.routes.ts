import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import commentController from "./comment.controller";

//? /api/post/comment
const router = Router();

router.post('/', auth(UserRole.ADMIN, UserRole.USER), commentController.addComment);
router.get('/:postId', commentController.getPostComment);


export const commentRoute = router;