import { UserService } from '../services/userService'
import { userService, postService } from '../services'
import { PostService } from '../services/postService'
import { CustomExpressRequest } from '../../shared/lib/expressRequest'
import express, { Response } from 'express'
// import { GetPostDTO } from '../dtos/posts/getPostDTO'

export class PostController {
	private postService: PostService
	private userService: UserService

	constructor(postService: PostService, userService: UserService) {
		this.postService = postService
		this.userService = userService
	}

	// 게시글 작성
	async createPosts(req: CustomExpressRequest, res: Response) {
		const { title, content, posting_password, images } = req.body
		console.log('request::: ', req.body)
		console.log('토큰정보 ::: ', req.auth)

		const user = await userService.getUserById(req.auth.id)

		if (!user) {
			res.status(400).json({ message: '유저를 찾을 수 없습니다.' })
		}

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
	async getPost(req: CustomExpressRequest, res: Response) {
		const post = await postService.getPost(+req.params.id)

		if (!post) {
			return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
		}

		return res.status(200).json(post)
	}

	// 유저아이디로 게시글 조회
	async getPostsBySnsId(req: CustomExpressRequest, res: Response) {
		const user = await userService.getUserById(req.auth.id)

		if (!user) {
			res.status(400).json({ message: '유저를 찾을 수 없습니다.' })
		}

		const getUser = await postService.getPostsByUserId(user.id)

		if (!getUser) {
			return res.status(400).json({ message: '게시글을 찾을 수 없습니다.' })
		}

		return res.status(200).json(getUser)
	}

	// 전체 게시글 조회하기
	async getPosts(req: CustomExpressRequest, res: Response) {
		const posts = await postService.getPosts()

		if (!posts) {
			return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
		}

		return res.status(200).json(posts)
	}

	// 게시글 수정하기
	async updatePost(req: CustomExpressRequest, res: Response) {
		const userId = req.auth.id
		const postId = +req.params.id

		const getPost = await postService.getPost(postId)

		if (!getPost) {
			return res.status(400).json({ message: '게시글을 찾을 수 없습니다.' })
		} else if (userId !== getPost.user_id) {
			return res.status(400).json({ message: '작성자가 아닙니다.' })
		} else if (postId !== getPost.id) {
			return res.status(400).json({ message: '유저가 작성한 게시글이 아닙니다.' })
		}

		const { title, content, posting_password, images } = req.body
		const post = await postService.updatePost({
			...req.body,
		})

		if (!post) {
			return res.status(400).json({ message: '게시글을 수정할 수 없습니다.' })
		}

		return res.status(200).json(post)
	}

	// 게시글 삭제하기
	async deletePost(req: CustomExpressRequest, res: Response) {
		const postId = +req.params.id
		const userId = req.auth.id

		const getPost = await postService.getPost(postId)

		if (!getPost || postId !== getPost.id) {
			res.status(400).json({ message: '게시글을 찾을 수 없습니다.' })
		}

		const post = await postService.deletePost({
			...req.body,
		})

		if (!post) {
			return res.status(400).json({ message: '게시글을 삭제할 수 없습니다.' })
		}

		return res.status(200).json(post)
	}
}
