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

	public async createUserService(dto: CreateUserDTO): Promise<UserDTO> {
		const { email, password, birth, age } = dto as CreateUserDTO

		const user = await this.userRepo.getUser(email)

		// 가입된 유저라면 유저 정보 리턴
		if (user) {
			return user
		}

		// 가입되지 않았을 경우 회원가입 진행
		try {
			const passwordRegex = /^[a-zA-Z0-9]{8,10}$/
			if (!password.match(passwordRegex)) {
				throw new Error('비밀번호는 8~10자의 영문 대/소문자와 숫자로 이루어져야 합니다.')
			}

			const saltRounds = 10
			const hashedPassword = await bcrypt.hash(password, saltRounds)

			let isAdult = false

			if (birth) {
				const currentDate = new Date()
				const birthDate = new Date(birth)
				const ageDiff = currentDate.getFullYear() - birthDate.getFullYear()

				if (ageDiff >= 19 || +age >= 19) {
					isAdult = true
				}
			}

			const result = await this.userRepo.createUser({
				email,
				password: hashedPassword,
				is_adult: isAdult,
				...dto,
			})

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
