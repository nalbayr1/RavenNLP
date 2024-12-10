-- CreateTable
CREATE TABLE "UserFavorite" (
    "userId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "UserFavorite_pkey" PRIMARY KEY ("userId","playerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorite_userId_playerId_key" ON "UserFavorite"("userId", "playerId");

-- AddForeignKey
ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
