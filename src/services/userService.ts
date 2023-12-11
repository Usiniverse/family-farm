import { UserDTO } from '../dtos/users/userDTO'
import { UserRepository } from '../repositorys/userRepository'
import { CreateUserDTO } from '../dtos/users/createUserDTO'
import { GetUserDTO } from '../dtos/users/getUserDTO'
import { registerSchema, alreadyEmailSchema } from '../../shared/lib/validator'
import bcrypt from 'bcrypt'
import { UpdateUserDTO } from '../dtos/users/updateUserDTO'
import { v4 as uuidv4 } from 'uuid'

export class UserService {
	private userRepo: UserRepository

	constructor(userRepo: UserRepository) {
		this.userRepo = userRepo
	}

	public async createUserService(dto: CreateUserDTO): Promise<UserDTO | any> {
		const { email, password, birth, age } = dto as CreateUserDTO

		// 이메일, 비밀번호 형식 체크
		await registerSchema.validateAsync({ email, password })

		const user = await this.userRepo.getUser(email)

		if (user) {
			return '이미 가입한 회원입니다.'
		}

		const uid = uuidv4()

		// 가입되지 않았을 경우 회원가입 진행
		try {
			const saltRounds = 10
			const hashedPassword = await bcrypt.hash(password, saltRounds)
			dto.password = hashedPassword

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
				uid,
				password,
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

			// 닉네임, 이메일 중복 체크
			const users = await this.userRepo.getUsers()
			for (let i = 0; i < users.length; i++) {
				if (users[i].email === email) {
					throw new Error('중복된 이메일입니다.')
				}

				if (users[i].nickname === nickname) {
					throw new Error('중복된 닉네임입니다.')
				}
			}

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
