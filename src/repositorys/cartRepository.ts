import { RowDataPacket } from 'mysql2'
import { CreateCartDTO } from '../dtos/carts/CreateCartDTO'
import { CartDTO } from '../dtos/carts/cartDTO'
import { connection } from '../../shared/lib/db'

export class CartRepository implements ICartRepository {
	public async createCart(dto: CreateCartDTO): Promise<CartDTO> {
		const query = `INSERT INTO carts (user_id, product_id, quantity, product_image, price) VALUES (?, ?, ?, ?, ?)`
		const values = [dto.user_id, dto.product_id, dto.quantity, dto.product_image, dto.price]

		try {
			const result = await new Promise<RowDataPacket>((resolve, reject) => {
				connection.query(query, values, (error, result) => {
					if (error) {
						reject(error)
					} else {
						resolve(result)
					}
				})
			})

			const selectQuery = `SELECT * FROM carts WHERE id = ?`

			const selectResult = await new Promise((resolve, reject) => {
				connection.query(selectQuery, [result.insertId], (selectError, selectResults) => {
					if (selectError) {
						reject(selectError)
					} else {
						resolve(selectResults)
					}
				})
			})

			return selectResult[0] as CartDTO
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async getCart(user_id: number): Promise<CartDTO> {
		const query = `SELECT * FROM carts WHERE user_id = ? ORDER BY create_at DESC`
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
			console.log('레포 ::: ', result)

			return result as CartDTO[]
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async deleteCart(cart_id: number): Promise<CartDTO> {
		const query = `DELETE FROM carts WHERE id = ?`
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
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async updateCart(cart_id: number, quantity: number): Promise<CartDTO> {
		const query = `UPDATE carts SET quantity = ? WHERE id = ?`
		const values = [quantity, cart_id]

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
		} catch (e) {
			console.error(e)
			throw e
		}
	}
}

export interface ICartRepository {
	createCart(dto: CreateCartDTO): Promise<CartDTO>
	getCart(user_id: number): Promise<CartDTO>
	getCarts(user_id: number): Promise<CartDTO[]>
	deleteCart(cart_id: number): Promise<CartDTO>
	updateCart(cart_id: number, quantity: number): Promise<CartDTO>
}
