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

// 게시글 수정
postRouter.put('/posts/:id', checkedUser, postController.updatePost)

// 게시글 삭제
postRouter.delete('/posts/:id', checkedUser, postController.deletePost)
