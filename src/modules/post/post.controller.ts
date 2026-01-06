import { Request, Response } from "express";
import postService from "./post.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await postService.createPost(req.body, req.user?.id as string);

        res.status(201).json({
            message: 'Post created successfully',
            data: result
        });
    } catch (error: any) {
        console.error('Server error: ', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error!',
            errors: error.message
        });
    }
}
const getPost = async (req: Request, res: Response) => {
    try {
        const searchText = req.query.searchText as string || "";



        const result = await postService.getPost(searchText);

        res.status(200).json({
            message: "All post retrived",
            data: result
        });
    } catch (error: any) {
        console.error('Server error: ', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error!',
            errors: error.message
        });
    }
}

const getPostById = async (req: Request, res: Response) => {
    try {
        const status = req.query.status || 'ALL';
        const result = await postService.getPostById(req.params.userId!, status as ('PRIVATE' | 'PUBLIC' | 'ALL'));

        res.status(200).json({
            message: "Post retrived successfully",
            data: result
        });
    } catch (error: any) {
        console.error('Server error: ', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error!',
            errors: error.message
        });
    }
}

const deletePost = async (req: Request, res: Response) => {
    try {
        const data = await postService.deletePost(req.params.postId!, req.user);

        if (data === null) {
            return res.status(404).json({
                success: false,
                message: "Post delation failed",
                error: "Post not found!"
            });
        }
        if (data == undefined) {
            return res.status(403).json({
                success: false,
                message: "Post delation failed",
                error: "You are not permited"
            })
        }

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: data
        });
    } catch (error: any) {
        console.error('Server error: ', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error!',
            errors: error.message
        });
    }
}
const updatePost = async (req: Request, res: Response) => {
    try {
        const data = await postService.updatePost(req.params.postId!, req.body, req.user);

        if (data === null) {
            return res.status(404).json({
                success: false,
                message: "Post update failed",
                error: "Post not found!"
            });
        }
        if (data == undefined) {
            return res.status(403).json({
                success: false,
                message: "Post update failed",
                error: "You are not permited"
            })
        }

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: data
        });
    } catch (error: any) {
        console.error('Server error: ', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error!',
            errors: error.message
        });
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