import express, { Request, Response, NextFunction } from 'express'
import { authController } from '../controllers'

export const authRouter = express.Router()

// 로그인
authRouter.post('/login', authController.login)

// 어드민 로그인
authRouter.post('/admin/login', authController.adminLogin)
