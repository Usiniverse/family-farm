import { authController, userController } from '../controllers'
import express, { Request, Response, NextFunction } from 'express'
import { checkedUser } from '../../shared/middleware/authMiddleware'

export const userRouter = express.Router()

// 회원가입
userRouter.post('/', userController.createUserController)

// 회원조회(email)
userRouter.get('/email', userController.getUserByEmail)

// 회원조회(sns_id)
userRouter.get('/sns_id', userController.getUserBySnsId)

// 회원정보수정
userRouter.put('/', checkedUser, userController.updateUser)
// userRouter.put('/', userController.updateUser)

// 회원탈퇴
userRouter.delete('/', checkedUser, userController.deleteUser)
