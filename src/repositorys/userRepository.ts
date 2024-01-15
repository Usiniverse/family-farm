import { UserDTO } from '../dtos/users/userDTO'
import { CreateUserDTO } from '../dtos/users/createUserDTO'
import { connection } from '../../shared/lib/db'
import { UpdateUserDTO } from '../dtos/users/updateUserDTO'
import { RowDataPacket } from 'mysql2'

export class UserRepository implements IUserRepository {
	async createUser(dto: CreateUserDTO): Promise<UserDTO> {
		const query = `
			INSERT INTO users 
			(uid, sns_id, email, name, birth, address, birthday, age, nickname, gender, password, phone, picture, is_adult) 
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`

		const values = [
			dto.uid,
			dto.sns_id,
			dto.email,
			dto.name,
			dto.birth,
			dto.address,
			dto.birthday,
			dto.age,
			dto.nickname,
			dto.gender,
			dto.password,
			dto.phone,
			dto.picture,
			dto.is_adult,
		]

		try {
			const result = await new Promise<RowDataPacket>((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			const selectUserQuery = `SELECT * FROM users where id = ?`
			const selectUserValue = [result.insertId]

			const selectUser = await new Promise((resolve, reject) => {
				connection.query(selectUserQuery, selectUserValue, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return selectUser[0] as UserDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	async getUsers(): Promise<UserDTO[]> {
		const query = `SELECT * FROM users`
		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return result as UserDTO[]
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	async getUser(email: string): Promise<UserDTO> {
		const query = `SELECT * FROM users WHERE email = ?`
		const values = [email]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return result[0] as UserDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	async getUserBySnsId(sns_id: string): Promise<UserDTO> {
		console.log('유저아이디 찾아보기', sns_id)

		const query = `SELECT * FROM users WHERE sns_id = ?`
		const values = [sns_id]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return result[0] as UserDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	async getUserById(id: number): Promise<UserDTO> {
		const query = `SELECT * FROM users WHERE id = ?`
		const values = [id]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return result[0] as UserDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	async updateUser(dto: UpdateUserDTO, id: number): Promise<UserDTO> {
		const query = `UPDATE users SET email = ?, password = ?, nickname = ?, name = ?, address = ? WHERE id = ?`
		const values = [dto.email, dto.password, dto.nickname, dto.name, dto.address, id]

		try {
			await new Promise<RowDataPacket>((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			const selectUserQuery = `SELECT * FROM users where id = ?`
			const selectUserValue = [id]

			const selectUser = await new Promise((resolve, reject) => {
				connection.query(selectUserQuery, selectUserValue, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return selectUser[0] as UserDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	async deleteUser(id: number): Promise<UserDTO | null> {
		const selectUserQuery = `SELECT * FROM users WHERE id = ?`
		const selectUserValue = [id]

		try {
			// 먼저 삭제 전에 사용자 정보를 가져옵니다.
			const selectUser = await new Promise<RowDataPacket>((resolve, reject) => {
				connection.query(selectUserQuery, selectUserValue, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results[0])
					}
				})
			})

			// 사용자 정보를 가져왔으면 사용자를 삭제합니다.
			const deleteQuery = `DELETE FROM users WHERE id = ?`
			const deleteValue = [id]

			await new Promise<void>((resolve, reject) => {
				connection.query(deleteQuery, deleteValue, (error) => {
					if (error) {
						reject(error)
					} else {
						resolve()
					}
				})
			})

			// 삭제 작업이 성공하면 사용자 정보가 아닌 null을 반환합니다.
			return null
		} catch (e) {
			console.error(e)
			throw e
		}
	}
}

interface IUserRepository {
	createUser(dto: CreateUserDTO): Promise<UserDTO>
	getUsers(): Promise<UserDTO[]>
	getUser(email: string): Promise<UserDTO>
	getUserBySnsId(sns_id: string): Promise<UserDTO>
	getUserById(id: number): Promise<UserDTO>
	updateUser(dto: UpdateUserDTO, id: number): Promise<UserDTO>
	deleteUser(id: number): Promise<UserDTO>
}
