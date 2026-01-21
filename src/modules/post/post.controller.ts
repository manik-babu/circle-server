import { NextFunction, Request, Response } from "express";
import postService from "./post.service";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await postService.createPost(req.body, req.user?.id as string);

        res.status(201).json({
            ok: true,
            message: 'Post created successfully',
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchText = req.query.searchText as string || "";
        const result = await postService.getPost(searchText);

        res.status(200).json({
            ok: true,
            message: "All post retrived",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const status = req.query.status || 'ALL';
        const result = await postService.getPostById(req.params.userId!, status as ('PRIVATE' | 'PUBLIC' | 'ALL'));

        res.status(200).json({
            ok: true,
            message: "Post retrived successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await postService.deletePost(req.params.postId!, req.user);

        res.status(200).json({
            ok: true,
            message: "Post deleted successfully",
            data: data
        });
    } catch (error: any) {
        next(error);
    }
}
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = await postService.updatePost(req.params.postId!, req.body, req.user);

        res.status(200).json({
            ok: true,
            message: "Post updated successfully",
            data: data
        });
    } catch (error: any) {
        next(error);
    }
}

const postController = {
    createPost,
    getPost,
    getPostById,
    deletePost,
    updatePost
}

export default postController;