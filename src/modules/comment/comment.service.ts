import CustomError from "../../helper/customError";
import { prisma } from "../../lib/prisma";


const addComment = async (payload: { content: string, postId: string, parentId?: string }, userId: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: payload.postId
        },
        select: {
            id: true
        }
    });

    if (!post) {
        throw new CustomError.NotFoundError("Unable to post your comment. The post might no longer exist.");
    }
    if (payload.parentId) {
        const parentComment = await prisma.comment.findUnique({
            where: {
                id: payload.parentId
            },
            select: {
                id: true
            }
        });
        if (!parentComment) {
            throw new CustomError.NotFoundError("Unable to post your reply. The comment might no longer exist.")
        }
    }

    return await prisma.comment.create({
        data: {
            ...payload,
            authorId: userId
        }
    })
}
const getPostComment = async (postId: string) => {
    const result = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        select: {
            comments: {
                where: {
                    parentId: null
                },
                include: {
                    _count: {
                        select: {
                            replies: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }

        }
    });

    if (!result) {
        throw new CustomError.NotFoundError("Can't retrived comments! The post might no longer exist.");
    }

    return result.comments;
}
const getCommentReplies = async (commentId: string) => {
    const result = await prisma.comment.findUnique({
        where: {
            id: commentId,
        },
        select: {
            replies: {
                include: {
                    _count: {
                        select: {
                            replies: true
                        }
                    }
                }
            }

        }
    });

    if (!result) {
        throw new CustomError.NotFoundError("Can't retrived replies! The comment might no longer exist.");
    }

    return result.replies;
}


const commentService = {
    addComment,
    getPostComment,
    getCommentReplies,
}

export default commentService;