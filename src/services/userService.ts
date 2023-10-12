import { UserDTO } from '../dtos/users/userDTO'
import { UserRepository } from '../repositorys/userRepository'
import { CreateUserDTO } from '../dtos/users/createUserDTO'
import { GetUserDTO } from '../dtos/users/getUserDTO'
import { registerSchema, alreadyEmailSchema } from '../../shared/lib/validator'
import bcrypt from 'bcrypt'
import { UpdateUserDTO } from '../dtos/users/updateUserDTO'

export class UserService {
	private userRepo: UserRepository

	constructor(userRepo: UserRepository) {
		this.userRepo = userRepo
	}

	public async createUserService(dto: CreateUserDTO): Promise<UserDTO> {
		const { email, password, birth, age } = dto as CreateUserDTO

		// 이메일, 비밀번호 형식 체크
		await registerSchema.validateAsync({ email, password })

		const user = await this.userRepo.getUser(email)

		// 가입된 유저라면 유저 정보 리턴
		if (user) {
			return user
		}

		// 가입되지 않았을 경우 회원가입 진행
		try {
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

	public async updateUser(dto: UpdateUserDTO & { id: number }): Promise<UserDTO> {
		const { id, email, password, name, nickname, address } = dto

		// 이메일, 비밀번호 형식 체크
		await registerSchema.validateAsync({ email, password })

		const user = await this.userRepo.getUser(email)

		// 가입되지 않았을 경우 회원가입 진행
		try {
			const saltRounds = 10
			const hashedPassword = await bcrypt.hash(password, saltRounds)

			const result = await this.userRepo.updateUser(
				{
					email,
					password: hashedPassword,
					...dto,
				},
				id,
			)

			return result
		} catch (error) {
			throw error
		}
	}

	public async deleteUser(id: number): Promise<void> {
		await this.userRepo.deleteUser(id)
	}
}
