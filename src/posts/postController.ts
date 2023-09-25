import { UserService } from '../users/userService'
import { userService } from '../users/index'
import { postService } from './index'
import { PostService } from './postService'
import { CustomExpressRequest } from '../../shared/lib/expressRequest'
import express from 'express'

export class PostController {
	private postService: PostService
	private userService: UserService

	constructor(postService: PostService, userService: UserService) {
		this.postService = postService
		this.userService = userService
	}

	// 게시글 작성
	async createPosts(req: CustomExpressRequest, res: express.Response) {
		const { title, content, posting_password, images } = req.body

		const user = await userService.getUserById(req.auth.id)
		const userId = req.auth.id

		const post = await postService.createPost({
			title,
			content,
			posting_password,
			images,
			sns_id: user.sns_id,
			user_id: userId,
		})

		if (!post) {
			return res.status(400).json({ message: '게시글을 작성할 수 없습니다.' })
		}

		return res.status(201).json(post)
	}

	// 게시글 id로 조회하기
	async getPost(req: CustomExpressRequest, res: express.Response) {
		const post = await postService.getPost({ id: +req.params.id })

		if (!post) {
			return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
		}

		return res.status(200).json(post)
	}

	// 유저아이디로 게시글 조회
	async getPostsBySnsId(req: CustomExpressRequest, res: express.Response) {
		console.log(req.auth)

		const user = await userService.getUserById(req.auth.id)
		console.log(user)

		const getUser = await postService.getPostsBySnsId(user.sns_id)

		return res.status(200).json(getUser)
	}

	// 전체 게시글 조회하기
	async getPosts(req: express.Request, res: express.Response) {
		const posts = await postService.getPosts()

		if (!posts) {
			return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
		}

		return res.status(200).json(posts)
	}

	// 게시글 수정하기
	async updatePost(req: CustomExpressRequest, res: express.Response) {
		const user_id = req.auth.id
		const { title, content, posting_password, images } = req.body
		const post = await postService.updatePost({
			...req.body,
		})

		if (!post) {
			return res.status(400).json({ message: '게시글을 수정할 수 없습니다.' })
		}

		return res.status(200).json(post)
	}

	async deletePost(req: express.Request, res: express.Response) {
		const {
			title,
			content,
			user_id,
			posting_password,
			images,
			options,
			created_at,
			updated_at,
		} = req.body
		const post = await postService.deletePost({
			...req.body,
		})

		if (!post) {
			return res.status(400).json({ message: '게시글을 삭제할 수 없습니다.' })
		}

		return res.status(200).json(post)
	}
}
