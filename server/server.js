import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db/pool.js";
import passport from "./configs/passportConfig.js"
import { appRouter } from "./routes/appRouter.js";

dotenv.config();
const port = process.env.PORT;

const pgSession = connectPgSimple(session);

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:5173",
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
        maxAge: 60 * 60 * 24 * 1000
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/", appRouter);

app.use((req, res)=>{
    res.status(404).send(
        `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>React App</title>
            </head>
            <body>
            <div id="root">There is no such page. Return back.</div>
            <a href="/">Home Page</a>
            </body>
            </html>
        `
    )
})

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
})