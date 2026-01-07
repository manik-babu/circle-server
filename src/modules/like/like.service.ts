import { prisma } from "../../lib/prisma"


const like = async (postId: string, userId: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            id: true
        }
    });

    if (!post) {
        return null;
    }
    try {
        await prisma.like.delete({
            where: {
                likeId: {
                    postId,
                    authorId: userId
                }
            }
        });
        return {
            message: "Unliked"
        }
    } catch (error) {
        await prisma.like.create({
            data: {
                postId,
                authorId: userId
            }
        });
        return {
            message: "liked"
        }
    }
}
const getLikedPeople = async (postId: string) => {
    const data = await prisma.like.findMany({
        where: {
            postId
        },
        select: {
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            },
            createdAt: true
        }
    });
    return data;
}

const likeService = {
    like,
    getLikedPeople,
}
export default likeService;