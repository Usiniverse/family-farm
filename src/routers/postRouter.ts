import express from 'express'
import { postController } from '../controllers'
const { isUser, checkedUser } = require('../../shared/middleware/authMiddleware')

export const postRouter = express.Router()

// 게시글 작성
postRouter.post('/', checkedUser, postController.createPosts)

// 게시글 조회
postRouter.get('/:id', postController.getPost)

// 게시글 전체 조회
postRouter.get('/', postController.getPosts)

// 게시글 수정
postRouter.put('/:id', checkedUser, postController.updatePost)

// 게시글 삭제
postRouter.delete('/:id', checkedUser, postController.deletePost)
