import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db/pool.js";
import passport from "./configs/passportConfig.js"
import { authRouter } from "./routes/authRouter.js";
import { messageRouter } from "./routes/messageRouter.js";

dotenv.config();
const port = process.env.PORT;

const pgSession = connectPgSimple(session);

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "https://autistic-club-8ano.onrender.com" : "http://localhost:5173",
    credentials: true
}))

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: "user_sessions",
        createTableIfMissing: true
    }),
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
})