import express from "express";
import {postController} from "./index";

const postsRouter = express.Router();

postsRouter.post("/posts", (req, res) => {
    postController.createPosts(req, res);
})

postsRouter.get("/posts/:id", (req, res) => {
    postController.getPost(req, res);
})

postsRouter.get("/posts", (req, res) => {
    postController.getPosts(req, res);
})

postsRouter.put("/posts/:id", (req, res) => {
    postController.updatePost(req, res);
})

postsRouter.delete("/posts/:id", (req, res) => {
    postController.deletePost(req, res);
})