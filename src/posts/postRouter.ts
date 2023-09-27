import express from 'express'
import { postController } from './index'
const { isUser, checkedUser } = require('../../shared/middleware/authMiddleware')

export const postRouter = express.Router()

// 게시글 작성
postRouter.post('/posts', checkedUser, postController.createPosts)

// 게시글 조회
postRouter.get('/posts/:id', postController.getPost)

// 게시글 조회 : 특정 유저가 쓴 글을 유저아이디로 조회
postRouter.get('/posts', checkedUser, postController.getPostsBySnsId)

// postRouter.get("/posts", (req, res) => {
//     postController.getPosts(req, res);
// })

// 게시글 수정
postRouter.put('/posts/:id', (req, res) => {
	postController.updatePost(req, res)
})

// 게시글 삭제
postRouter.delete('/posts/:id', (req, res) => {
	postController.deletePost(req, res)
})
