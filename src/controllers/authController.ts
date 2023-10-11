import { userService } from '../services'
import { LoginDTO } from '../dtos/auth/LoginDTO'
import { UserDTO } from '../dtos/users/userDTO'
import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthController {
	public async loginService({ email, password }: LoginDTO): Promise<UserDTO | null> {
		try {
			// 사용자 이메일로 사용자 정보 가져오기
			const user = await userService.getUserByEmail({ email })

			if (!user) {
				throw new Error('사용자를 찾을 수 없습니다.')
			}

			// bcrypt를 사용하여 비밀번호 검사
			const passwordMatch = await bcrypt.compare(password, user.password)

			// 비밀번호 일치여부 확인
			if (passwordMatch) {
				return user
			} else {
				return null
			}
		} catch (error) {
			throw error
		}
	}

	public async getMe(req: Request, res: Response) {
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
	}
}
