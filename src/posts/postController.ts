import {PostUseCase} from "./postUseCase";
import express from "express";

export class PostController {
    private postService: PostUseCase;
    constructor(postService: PostUseCase) {
        this.postService = postService;
    }
    async createPosts(req: express.Request, res: express.Response) {
        const { title, content, user_id, posting_password, images, options, created_at, updated_at } = req.body;
        const post = await this.postService.createPost({
            ...req.body
        });

        if (!post) {
            return res.status(400).json({ message: "게시글을 작성할 수 없습니다." });
        }

        return res.status(201).json(post);
    }

    async getPosts(req: express.Request, res: express.Response) {
        const post = await this.postService.getPost({ id: +req.params.id });

        if (!post) {
            return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }

        return res.status(200).json(post);
    }

    async getPost(req: express.Request, res: express.Response) {
        const posts = await this.postService.getPosts();

        if (!posts) {
            return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }

        return res.status(200).json(posts);
    }

    async updatePost(req: express.Request, res: express.Response) {
        const { title, content, user_id, posting_password, images, options, created_at, updated_at } = req.body;
        const post = await this.postService.updatePost({
            ...req.body
        });

        if (!post) {
            return res.status(400).json({ message: "게시글을 수정할 수 없습니다." });
        }

        return res.status(201).json(post);
    }

    async deletePost(req: express.Request, res: express.Response) {
        const { title, content, user_id, posting_password, images, options, created_at, updated_at } = req.body;
        const post = await this.postService.deletePost({
            ...req.body
        });

        if (!post) {
            return res.status(400).json({ message: "게시글을 삭제할 수 없습니다." });
        }

        return res.status(201).json(post);
    }
}