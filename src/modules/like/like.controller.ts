import { Request, Response } from "express";
import likeService from "./like.service";


const like = async (req: Request, res: Response) => {
    try {
        const result = await likeService.like(req.params.postId!, req.user?.id!);

        if (result === null) {
            return res.status(404).json({
                success: false,
                message: "Can't like",
                error: "Post does not exist"
            })
        }

        res.status(200).json(result);
    } catch (error: any) {
        console.error('Server error: ', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error!',
            errors: error.message
        });
    }
}
const getLikedPeople = async (req: Request, res: Response) => {
    try {
        const result = await likeService.getLikedPeople(req.params.postId!);

        res.status(200).json({
            message: "Liked people retrived successfully",
            data: result
        })
    } catch (error: any) {
        console.error('Server error: ', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error!',
            errors: error.message
        });
    }
}

const likeController = {
    like,
    getLikedPeople,
}
export default likeController;