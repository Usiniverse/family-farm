import express, { Request, Response, NextFunction } from 'express'
import { commentController } from '../controllers'
import { checkedUser } from '../../shared/middleware/authMiddleware'

export const commentRouter = express.Router()

commentRouter.post('/:id/comments', checkedUser, commentController.createComment)
