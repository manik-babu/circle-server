import { Request, Response } from "express";
import commentService from "./comment.service";

const addComment = async (req: Request, res: Response) => {
    try {
        const result = await commentService.addComment(req.body, req.user?.id!);

        if (result === null) {
            return res.status(404).json({
                message: "Comment create failed",
                error: "Post not found"
            });
        }
        if (result === undefined) {
            return res.status(404).json({
                message: "Comment create failed",
                error: "Comment not found"
            });
        }

        res.status(201).json({
            message: "Comment created",
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
const getPostComment = async (req: Request, res: Response) => {
    try {
        const result = await commentService.getPostComment(req.params.postId!);

        if (!result) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.status(200).json({
            message: "Comment retrived successfully",
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
const getCommentReplies = async (req: Request, res: Response) => {
    try {
        const result = await commentService.getCommentReplies(req.params.commentId!);

        if (!result) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }
        res.status(200).json({
            message: "Replies retrived successfully",
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


const commentController = {
    addComment,
    getPostComment,
    getCommentReplies,
}
export default commentController;

