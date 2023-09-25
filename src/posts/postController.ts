import { UserService } from '../users/userService';
import { userService } from '../users/index'
import { postService } from './index'
import { PostService } from './postService'
import express from "express";

export class PostController {
    private postService: PostService;
    private userService: UserService;
    
    constructor(postService: PostService, userService: UserService) {
        this.postService = postService;
        this.userService = userService
    }
    
    // 게시글 작성
    async createPosts(req: any, res: express.Response) {
        const { title, content, posting_password, images } = req.body;
        
        const user = await userService.getUserById(req.authInfo.id)
        
        const post = await postService.createPost({
            title,
            content, 
            posting_password, 
            images, 
            sns_id: user.sns_id
        });
        console.log('DB생성 후 컨트롤러 반환 값:::', post);
        

        if (!post) {
            return res.status(400).json({ message: "게시글을 작성할 수 없습니다." });
        }

        return res.status(201).json(post);
    }

    // 게시글 id로 조회하기
    async getPost(req: express.Request, res: express.Response) {
        const post = await postService.getPost({ id: +req.params.id });

        if (!post) {
            return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }

        return res.status(200).json(post);
    }

    // 전체 게시글 조회하기
    async getPosts(req: express.Request, res: express.Response) {
        const posts = await postService.getPosts();

        if (!posts) {
            return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }

        return res.status(200).json(posts);
    }

    // 게시글 수정하기
    async updatePost(req: express.Request, res: express.Response) {
        const { title, content, user_id, posting_password, images, options, created_at, updated_at } = req.body;
        const post = await postService.updatePost({
            ...req.body
        });

        if (!post) {
            return res.status(400).json({ message: "게시글을 수정할 수 없습니다." });
        }

        return res.status(200).json(post);
    }

    async deletePost(req: express.Request, res: express.Response) {
        const { title, content, user_id, posting_password, images, options, created_at, updated_at } = req.body;
        const post = await postService.deletePost({
            ...req.body
        });

        if (!post) {
            return res.status(400).json({ message: "게시글을 삭제할 수 없습니다." });
        }

        return res.status(200).json(post);
    }

    async test(req: any, res: express.Response) {
        const user = await userService.getUserById(req.authInfo.id)
        
        const getUser = await postService.test(user.sns_id)

        return res.status(200).json(getUser);
    }
}