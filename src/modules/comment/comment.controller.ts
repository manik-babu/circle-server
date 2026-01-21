import { NextFunction, Request, Response } from "express";
import commentService from "./comment.service";

const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await commentService.addComment(req.body, req.user?.id!);

        res.status(201).json({
            ok: true,
            message: "Comment created",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
const getPostComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await commentService.getPostComment(req.params.postId!);

        res.status(200).json({
            ok: true,
            message: "Comment retrived successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
const getCommentReplies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await commentService.getCommentReplies(req.params.commentId!);

        res.status(200).json({
            ok: true,
            message: "Replies retrived successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}


const commentController = {
    addComment,
    getPostComment,
    getCommentReplies,
}
export default commentController;

