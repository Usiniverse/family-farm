import { userController } from '../controllers'
import express, { Request, Response, NextFunction } from 'express'

export const userRouter = express.Router()

// 회원가입
userRouter.post('/', userController.createUserController)

// 회원조회(email)
userRouter.get('/email', userController.getUserByEmail)

// 회원조회(sns_id)
userRouter.get('/sns_id', userController.getUserBySnsId)

// 회원정보수정

// 회원탈퇴
