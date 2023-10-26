import express, { Request, Response, NextFunction } from 'express'
import { authController } from '../controllers'

export const authRouter = express.Router()

// 로그인
authRouter.get('/login', authController.login)
