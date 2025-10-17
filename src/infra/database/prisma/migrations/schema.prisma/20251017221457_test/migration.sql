-- DropForeignKey
ALTER TABLE "public"."audits" DROP CONSTRAINT "audits_user_id_fkey";

-- AlterTable
ALTER TABLE "audits" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "audits" ADD CONSTRAINT "audits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
