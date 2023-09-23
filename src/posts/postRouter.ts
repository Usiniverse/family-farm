import express from "express";
import {postController} from "./index";
const { isUser, checkedUser } = require('../../shared/middleware/authMiddleware')

export const postRouter = express.Router();

postRouter.post("/posts", checkedUser, postController.createPosts)

postRouter.get("/posts/:id", (req, res) => {
    postController.getPost(req, res);
})

postRouter.get("/posts", (req, res) => {
    postController.getPosts(req, res);
})

postRouter.put("/posts/:id", (req, res) => {
    postController.updatePost(req, res);
})

postRouter.delete("/posts/:id", (req, res) => {
    postController.deletePost(req, res);
})