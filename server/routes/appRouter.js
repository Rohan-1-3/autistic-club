import { Router } from "express";

export const appRouter = new Router();

appRouter.get("/api", (req, res)=>{
    res.status(200).json({
        message: "Hello From server"
    })
})