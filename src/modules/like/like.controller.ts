import { NextFunction, Request, Response } from "express";
import likeService from "./like.service";


const like = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await likeService.like(req.params.postId!, req.user?.id!);

        res.status(200).json({
            ok: true,
            message: result,
            data: null
        });
    } catch (error: any) {
        next(error);
    }
}
const getLikedPeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await likeService.getLikedPeople(req.params.postId!);

        res.status(200).json({
            ok: true,
            message: "Liked people retrived successfully",
            data: result
        })
    } catch (error: any) {
        next(error);
    }
}

const likeController = {
    like,
    getLikedPeople,
}
export default likeController;