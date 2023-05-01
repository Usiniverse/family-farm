import express from "express";
import {createPostController} from "./index";

const postsRouter = express.Router();

postsRouter.get("/posts", (req, res) => {
    res.send("posts");
})

postsRouter.post("/posts", (req, res) => {
    createPostController.executeImpl(req, res);
})