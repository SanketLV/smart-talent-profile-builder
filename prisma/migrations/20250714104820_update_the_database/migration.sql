/*
  Warnings:

  - You are about to drop the column `type` on the `Link` table. All the data in the column will be lost.
  - Added the required column `platform` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "type",
ADD COLUMN     "platform" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "budget_range" TEXT,
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "endorsements" TEXT[],
ADD COLUMN     "experience_years" INTEGER,
ADD COLUMN     "interest_tags" TEXT[],
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "past_credits" TEXT[],
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "style_tags" TEXT[],
ADD COLUMN     "tier_tags" TEXT[];

-- CreateTable
CREATE TABLE "SoftSkill" (
    "id" TEXT NOT NULL,
    "trait" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "SoftSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftwareSkill" (
    "id" TEXT NOT NULL,
    "tool" TEXT NOT NULL,
    "proficiency" INTEGER NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "SoftwareSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tags" TEXT[],
    "keywords" TEXT[],
    "mediaUrl" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SoftSkill" ADD CONSTRAINT "SoftSkill_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareSkill" ADD CONSTRAINT "SoftwareSkill_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
