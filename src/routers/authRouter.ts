import express, { Request, Response, NextFunction } from 'express'
import { authController } from '../controllers'

export const authRouter = express.Router()

// 로그인
authRouter.get('/login', authController.loginService)

// 유효 회원 검증
authRouter.get('/me', authController.getMe)
