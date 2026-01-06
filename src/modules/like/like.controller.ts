import { Request, Response } from "express";
import likeService from "./like.service";


const addLike = async (req: Request, res: Response) => {
    try {
        const result = await likeService.addLike(req.params.postId!, req.user?.id!);

        res.status(201).json({
            message: "Liked"
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

const likeController = {
    addLike,
}
export default likeController;