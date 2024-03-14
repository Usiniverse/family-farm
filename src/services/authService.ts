import { userService } from '../services'
import { LoginDTO } from '../dtos/auth/LoginDTO'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthService {
	public async loginService({ email, password }: LoginDTO): Promise<any> {
		try {
			// 사용자 이메일로 사용자 정보 가져오기
			const user = await userService.getUserByEmail({ email })

			if (!user) {
				throw new Error('사용자를 찾을 수 없습니다.')
			}

			// 비밀번호가 있으며 sns_id가 없는 사람 === 회원가입한 사람
			if (password && !user.sns_id) {
				// bcrypt를 사용하여 비밀번호 검사
				const passwordMatch = await bcrypt.compare(password, user.password)

				if (!passwordMatch) {
					throw new Error('비밀번호가 맞지 않습니다.')
				}
			}

			// jwt를 사용한 accessToken, refreshToken 생성
			const accessToken = jwt.sign({ id: user.id }, process.env.MY_KEY, {
				algorithm: 'HS256',
				expiresIn: '1d',
			})

			// 리프레시 토큰
			// const refreshToken = jwt.sign({ id: user.id }, process.env.MY_KEY, {
			// 	algorithm: 'HS256',
			// 	expiresIn: '1d',
			// })

			return { user, accessToken }
		} catch (error) {
			throw error
		}
	}

	public async adminLoginService({ email, password }: LoginDTO): Promise<any> {
		try {
			const user = await userService.getUserByEmail({ email })

			if (!user) {
				throw new Error('사용자를 찾을 수 없습니다.')
			}

			if (user.email === process.env.ADMIN_USER) {
				if (password && !user.sns_id) {
					const passwordMatch = await bcrypt.compare(password, user.password)

					if (!passwordMatch) {
						throw new Error('비밀번호가 맞지 않습니다.')
					}
				}

				const accessToken = jwt.sign({ id: user.id }, process.env.MY_KEY, {
					algorithm: 'HS256',
					expiresIn: '1d',
				})

				return { user, accessToken }
			} else {
				return '관리자가 아닙니다.'
			}
		} catch (error) {
			throw error
		}
	}
}
