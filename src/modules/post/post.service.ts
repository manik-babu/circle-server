import { Post } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createPost = async (payload: Pick<Post, "caption" | "status" | "attachment">, userId: string) => {
    const createdPost = await prisma.post.create({
        data: {
            caption: payload.caption,
            status: payload.status,
            attachment: payload.attachment,
            authorId: userId
        }
    })

    return createdPost;
}

const getPost = async (searchText: string) => {
    const data = await prisma.post.findMany({
        where: {
            AND: [
                {
                    status: 'PUBLIC'
                },
                {
                    caption: {
                        contains: searchText,
                        mode: 'insensitive'
                    }
                }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return data;
}
const getPostById = async (userId: string, status: 'PUBLIC' | 'PRIVATE' | 'ALL') => {
    const data = await prisma.post.findMany({
        where: {
            authorId: userId,
            ...(status !== 'ALL' && { status })
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return data;
}

const postService = {
    createPost,
    getPost,
    getPostById,
}
export default postService;