-- CreateTable
CREATE TABLE "auth_users" (
    "id" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255),
    "lastname" VARCHAR(255),
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "ismember" BOOLEAN DEFAULT false,
    "isadmin" BOOLEAN DEFAULT false,

    CONSTRAINT "auth_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" VARCHAR(255) NOT NULL,
    "userid" VARCHAR(255),
    "message" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "isedited" BOOLEAN DEFAULT false,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_users_username_key" ON "auth_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_sessions_sid_key" ON "user_sessions"("sid");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_userid_fkey" FOREIGN KEY ("userid") REFERENCES "auth_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
