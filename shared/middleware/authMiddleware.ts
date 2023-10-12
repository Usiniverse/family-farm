import express, { Request, Response, NextFunction } from 'express'
import { CustomExpressRequest } from '../lib/expressRequest'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

//* 사용자 미들웨어를 직접 구현

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	// isAuthenticated()로 검사해 로그인이 되어있으면
	if (req.isAuthenticated()) {
		next() // 다음 미들웨어
	} else {
		res.status(403).send('로그인 필요')
	}
}

export const isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAuthenticated()) {
		next() // 로그인 안되어있으면 다음 미들웨어
	} else {
		const message = encodeURIComponent('로그인한 상태입니다.')
		res.redirect(`/?error=${message}`)
	}
}

export const isUser = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization

	const tokenVerify = jwt.verify(token as string, process.env.MY_KEY as string)

	req.authInfo = tokenVerify

	return res.status(200).json({
		code: 200,
		message: '토큰이 정상입니다.',
		data: {
			user: tokenVerify,
		},
	})
}

export const checkedUser = (req, res, next) => {
	const token = req.headers.authorization

	const tokenVerify = jwt.verify(token as string, process.env.MY_KEY as string)

	req.auth = tokenVerify
	next()
}
