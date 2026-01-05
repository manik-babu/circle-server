-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parantId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parantId_fkey" FOREIGN KEY ("parantId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
