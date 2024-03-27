import { RowDataPacket } from 'mysql2'
import { CreateCartDTO } from '../dtos/carts/CreateCartDTO'
import { CartDTO } from '../dtos/carts/cartDTO'
import { connection } from '../../shared/lib/db'
import { UpdateCartDTO } from '../dtos/carts/updateCartDTO'

export class CartRepository implements ICartRepository {
	public mapRowToCartDTO(row: any): CartDTO {
		return {
			id: row.id,
			user_id: row.user_id,
			created_at: row.created_at,
			updated_at: row.updated_at,
		}
	}

	public async createCart(dto: CreateCartDTO): Promise<CartDTO> {
		const query = `INSERT INTO carts (user_id) VALUES (?)`
		const values = [dto.user_id]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, result) => {
					if (error) {
						reject(error)
					} else {
						resolve(result.insertId)
					}
				})
			})
			console.log('result', result)

			const selectQuery = `SELECT * FROM carts WHERE id = ?`

			const selectResult = await new Promise((resolve, reject) => {
				connection.query(selectQuery, [result], (selectError, selectResults) => {
					if (selectError) {
						reject(selectError)
					} else {
						resolve(this.mapRowToCartDTO(selectResults[0]))
					}
				})
			})

			return selectResult as CartDTO
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async getCart(cart_id: number): Promise<CartDTO> {
		const query = `SELECT * FROM carts WHERE id = ?`
		const values = [cart_id]

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

			return result[0] as CartDTO
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async getCartByUserId(user_id: number): Promise<CartDTO> {
		const query = `SELECT * FROM carts WHERE user_id = ? ORDER BY created_at DESC`
		const value = [user_id]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, value, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return result[0] as CartDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async getCarts(user_id: number): Promise<CartDTO[]> {
		const query = `SELECT * FROM carts WHERE user_id = ?`
		const value = [user_id]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, value, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return result as CartDTO[]
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async deleteCart(cart_id: number): Promise<CartDTO> {
		const query = `DELETE FROM carts WHERE id = ?`
		const values = [cart_id]

		const cartBeforeDeletion = await this.getCart(cart_id)

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

			return cartBeforeDeletion
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	// public async updateCart(dto: UpdateCartDTO): Promise<CartDTO> {
	// 	const query = `UPDATE carts SET quantity = ?, WHERE id = ?`
	// 	const values = [dto.quantity, dto.cart_id]

	// 	try {
	// 		await new Promise((resolve, reject) => {
	// 			connection.query(query, values, (error, results) => {
	// 				if (error) {
	// 					reject(error)
	// 				} else {
	// 					resolve(results)
	// 				}
	// 			})
	// 		})

	// 		const selectQuery = `SELECT * FROM carts WHERE id = ?`
	// 		const selectValue = [dto.cart_id]

	// 		const selectResult = await new Promise((resolve, reject) => {
	// 			connection.query(selectQuery, selectValue, (selectError, selectResults) => {
	// 				if (selectError) {
	// 					reject(selectError)
	// 				} else {
	// 					resolve(selectResults)
	// 				}
	// 			})
	// 		})

	// 		return selectResult[0] as CartDTO
	// 	} catch (e) {
	// 		console.error(e)
	// 		throw e
	// 	}
	// }
}

export interface ICartRepository {
	createCart(dto: CreateCartDTO): Promise<CartDTO>
	getCart(cart_id: number): Promise<CartDTO>
	getCartByUserId(user_id: number): Promise<CartDTO>
	getCarts(user_id: number): Promise<CartDTO[]>
	deleteCart(cart_id: number): Promise<CartDTO>
	// updateCart(dto: UpdateCartDTO): Promise<CartDTO>
}
