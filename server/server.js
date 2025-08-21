import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import prisma from "./db/prismaClient.js";
import passport from "./configs/passportConfig.js"
import { authRouter } from "./routes/authRouter.js";
import { messageRouter } from "./routes/messageRouter.js";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.set('trust proxy', 1);

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "https://autistic-club.vercel.app" : "http://localhost:5173",
    credentials: true
}))

app.use(session({
    store: new PrismaSessionStore(
        prisma,
        {
            checkPeriod: 2 * 60 * 1000,  // ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    ),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 60 * 60 * 24 * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/api" ,authRouter);
app.use("/api/message", messageRouter)

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
});

// Graceful shutdown for Prisma
process.on('SIGINT', async () => {
    console.log('Received SIGINT. Graceful shutdown...');
    await prisma.$disconnect();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Graceful shutdown...');
    await prisma.$disconnect();
    process.exit(0);
});