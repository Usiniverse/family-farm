import { UserDTO } from '../dtos/users/userDTO'
import { UserRepository } from '../repositorys/userRepository'
import { CreateUserDTO } from '../dtos/users/createUserDTO'
import { GetUserDTO } from '../dtos/users/getUserDTO'
import bcrypt from 'bcrypt'

export class UserService {
	private userRepo: UserRepository

	constructor(userRepo: UserRepository) {
		this.userRepo = userRepo
	}

	public async createUserService({ email, password }: CreateUserDTO): Promise<UserDTO> {
		try {
			const passwordRegex = /^[a-zA-Z0-9]{8,10}$/
			if (!password.match(passwordRegex)) {
				throw new Error('비밀번호는 8~10자의 영문 대/소문자와 숫자로 이루어져야 합니다.')
			}

			const saltRounds = 10
			const hashedPassword = await bcrypt.hash(password, saltRounds)

			const result = await this.userRepo.createUser({ email, password: hashedPassword })

			return result
		} catch (error) {
			throw error
		}
	}

	public async getUserByEmail({ email }: GetUserDTO): Promise<UserDTO> {
		const result = await this.userRepo.getUser(email)

		return result
	}

	public async getUserById(id: number): Promise<UserDTO> {
		const result = await this.userRepo.getUserById(id)

		return result
	}

	public async getUserBySnsId({ sns_id }: GetUserDTO): Promise<UserDTO> {
		const result = await this.userRepo.getUserBySnsId(sns_id)

		return result
	}
}
