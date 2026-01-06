import { Post } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middleware/auth";

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
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true
                }
            }
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
const deletePost = async (postId: string, user: any) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });
    if (!post) {
        return null;
    }

    if (post.authorId != user.id && user.role == UserRole.USER) {
        console.log(post.id, user.id, user.role)
        return undefined;
    }
    const result = await prisma.post.delete({
        where: {
            id: postId
        }
    });


    return result;
}

const updatePost = async (postId: string, payload: { caption?: string, attachment?: string, status?: 'PRIVATE' | 'PUBLIC' }, user: any) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });
    if (!post) {
        return null;
    }

    if (post.authorId != user.id && user.role == UserRole.USER) {
        return undefined;
    }
    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: payload
    });
    return updatedPost;
}
const postService = {
    createPost,
    getPost,
    getPostById,
    deletePost,
    updatePost
}
export default postService;