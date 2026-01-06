import { prisma } from "../../lib/prisma"


const addLike = async (postId: string, userId: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });

    if (!post) {
        return null;
    }

    // await prisma.like.create({
    //     data: {
    //         postId,
    //         authorId: userId
    //     }
    // })
    return true;


}

const likeService = {
    addLike,
}
export default likeService;