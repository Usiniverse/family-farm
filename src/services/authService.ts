import { userService } from '../services'
import { LoginDTO } from '../dtos/auth/LoginDTO'
import { UserDTO } from '../dtos/users/userDTO'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthService {
	public async loginService({ email, password }: LoginDTO) {
		try {
			// 사용자 이메일로 사용자 정보 가져오기
			const user = await userService.getUserByEmail({ email })

			if (!user) {
				throw new Error('사용자를 찾을 수 없습니다.')
			}

			// bcrypt를 사용하여 비밀번호 검사
			// const passwordMatch = await bcrypt.compare(password, user.password)

			// if (!passwordMatch) {
			// 	throw new Error('비밀번호가 맞지 않습니다.')
			// }

			// jwt를 사용한 accessToken, refreshToken 생성
			const accessToken = jwt.sign({ id: user.id }, process.env.MY_KEY, {
				algorithm: 'HS256',
				expiresIn: '1d',
			})

			// const refreshToken = jwt.sign({ id: user.id }, process.env.MY_KEY, {
			// 	algorithm: 'HS256',
			// 	expiresIn: '1d',
			// })

			// if (passwordMatch) {
			return { user, accessToken }
			// } else {
			// return null
			// }
		} catch (error) {
			throw error
		}
	}
}
