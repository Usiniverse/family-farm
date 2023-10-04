import { log } from 'console'
import { userController } from '../controllers'
import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const { isLoggedIn, isNotLoggedIn, isUser } = require('../../shared/middleware/authMiddleware')
export const userRouter = express.Router()

// 회원가입
userRouter.post('/', userController.createUserController)

// 유효 회원 검증
userRouter.get('/me', (req: Request, res: Response) => {
	const token = req.headers.authorization

	const tokenVerify = jwt.verify(token as string, process.env.MY_KEY as string)
	console.log(tokenVerify)

	req.authInfo = tokenVerify
	console.log('req.authInfo::: ', req.authInfo)

	return res.status(200).json({
		code: 200,
		message: '토큰이 정상입니다.',
		data: {
			user: tokenVerify,
		},
	})
})

// 회원조회(email)
userRouter.get('/email', userController.getUserController)

// 회원조회(sns_id)
userRouter.get('/sns_id', userController.getUserBySnsId)

// 회원정보수정

// 회원탈퇴
