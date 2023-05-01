import {CreatePostUseCase} from "./createPostUseCase";
import express from "express";

export class CreatePostController {
    private postService: CreatePostUseCase;
    constructor(postService: CreatePostUseCase) {
        this.postService = postService;
    }
    async executeImpl(req: express.Request, res: express.Response) {
        const { title, content, user_id, posting_password, images, options, created_at, updated_at } = req.body;
        const post = await this.postService.execute({
            ...req.body
        });

        if (!post) {
            return res.status(400).json({ message: "게시글을 작성할 수 없습니다." });
        }

        return res.status(201).json(post);
    }
}