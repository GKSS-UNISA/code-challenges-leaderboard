-- CreateTable
CREATE TABLE "ClientID" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clerk_user_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ClientID_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "client_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientID_clerk_user_id_key" ON "ClientID"("clerk_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ClientID_value_key" ON "ClientID"("value");

-- CreateIndex
CREATE INDEX "ClientID_clerk_user_id_idx" ON "ClientID"("clerk_user_id");

-- CreateIndex
CREATE INDEX "Score_client_id_idx" ON "Score"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "Score_client_id_key" ON "Score"("client_id");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "ClientID"("id") ON DELETE CASCADE ON UPDATE CASCADE;
