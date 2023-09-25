import express from 'express'
import { postController } from './index'
const { isUser, checkedUser } = require('../../shared/middleware/authMiddleware')

export const postRouter = express.Router()

// 게시글 작성
postRouter.post('/posts', checkedUser, postController.createPosts)

// 게시글 조회
postRouter.get('/posts/:id', (req, res) => {
	postController.getPost(req, res)
})

// 유저아이디로 게시글 조회
postRouter.get('/posts', checkedUser, postController.getPostsBySnsId)

// postRouter.get("/posts", (req, res) => {
//     postController.getPosts(req, res);
// })

postRouter.put('/posts/:id', (req, res) => {
	postController.updatePost(req, res)
})

postRouter.delete('/posts/:id', (req, res) => {
	postController.deletePost(req, res)
})
