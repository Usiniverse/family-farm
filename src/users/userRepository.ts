import { Knex } from 'knex'
import { AppleFarmDBClient } from '../../shared/lib/db'
import { UserDTO } from './dtos/users'
import { CreateUserDTO } from './dtos/createUserDTO'
import { updateUserDTO } from './dtos/updateUserDTO'
export class UserRepository implements IUserRepository {
	private client: AppleFarmDBClient

	constructor(client: AppleFarmDBClient) {
		this.client = client
	}

	get knex(): Knex {
		return this.client.knex
	}

	async createUser(dto: CreateUserDTO): Promise<UserDTO> {
		console.log(dto)

		const [createdUser] = await this.knex('users').insert(dto, ['*'])
		return createdUser
	}

	async getUser(email: string): Promise<UserDTO> {
		const [user] = await this.knex('users').select('*').where({ email })
		return user
	}

	async getUserBySnsId(sns_id: string): Promise<UserDTO> {
		const [user] = await this.knex('users').select('*').where({ sns_id })
		return user
	}

	async getUserById(id: number): Promise<UserDTO> {
		const [user] = await this.knex('users').select('*').where({ id })
		return user
	}

	async updateUser(dto: updateUserDTO): Promise<UserDTO> {
		const [user] = await this.knex('users').update(dto, ['*'])
		return user
	}
}

interface IUserRepository {
	createUser(dto: CreateUserDTO): Promise<UserDTO>
	getUser(email: string): Promise<UserDTO>
	getUserBySnsId(sns_id: string): Promise<UserDTO>
	getUserById(id: number): Promise<UserDTO>
	updateUser(dto: updateUserDTO): Promise<UserDTO>
}
