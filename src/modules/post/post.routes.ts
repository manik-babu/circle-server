import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import postController from "./post.controller";

//? /api/post
const router = Router();

router.post('/', auth(UserRole.ADMIN, UserRole.USER), postController.createPost);
router.get('/', postController.getPost);
router.get('/:userId', postController.getPostById);
// router.delete('/:postId', auth(UserRole.USER, UserRole.ADMIN), )


export const postRoute = router;


