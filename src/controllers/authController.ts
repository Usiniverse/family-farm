import { userService } from '../services'
import { LoginDTO } from '../dtos/auth/LoginDTO'
import { UserDTO } from '../dtos/users/userDTO'
import bcrypt from 'bcrypt'

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
}
