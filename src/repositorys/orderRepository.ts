import { CreateOrderDTO } from '../dtos/orders/createOrderDTO'
import { OrderDTO } from '../dtos/orders/orderDTO'
import { UpdateOrderDTO } from '../dtos/orders/updateOrderDTO'
import { connection } from '../../shared/lib/db'

export class OrderRepository implements IOrderRepository {
	private mapRowToOrderDTO(row: any): OrderDTO {
		return {
			id: row.id,
			user_id: row.user_id,
			order_name: row.order_name,
			order_address: row.order_address,
			order_phone_number: row.order_phone_number,
			delivery_name: row.delivery_name,
			delivery_address: row.delivery_address,
			delivery_phone_number: row.delivery_phone_number,
			delivery_message: row.delivery_message,
			created_at: row.created_at,
			updated_at: row.updated_at,
		}
	}

	public async createOrder(dto: CreateOrderDTO): Promise<OrderDTO> {
		const query = `INSERT INTO orders (
			user_id, 
			order_name, 
			order_address, 
			order_phone_number, 
			delivery_name, 
			delivery_address, 
			delivery_phone_number, 
			delivery_message
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
		const values = [
			dto.user_id,
			dto.order_name,
			dto.order_address,
			dto.order_phone_number,
			dto.delivery_name,
			dto.delivery_address,
			dto.delivery_phone_number,
			dto.delivery_message,
		]

		try {
			const insertResult = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results.insertId)
					}
				})
			})

			const selectQuery = `SELECT * FROM orders WHERE id = ?`

			const selectResult = await new Promise<OrderDTO>((resolve, reject) => {
				connection.query(selectQuery, [insertResult], (selectError, selectResults) => {
					if (selectError) {
						reject(selectError)
					} else {
						resolve(this.mapRowToOrderDTO(selectResults[0]))
					}
				})
			})

			return selectResult as OrderDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async getOrdersForDate(startDate: Date, endDate: Date): Promise<any[]> {
		// const query = `
		// 	SELECT o.*, u.*
		// 	FROM orders as o
		// 	INNER JOIN users as u ON o.user_id = u.id
		// 	WHERE o.created_at = ?
		// `
		const query = `SELECT * FROM orders WHERE created_at BETWEEN ? AND ?`
		const values = [startDate, endDate]

		try {
			const results = await new Promise<any[]>((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			const result = results.map((row) => this.mapRowToOrderDTO(row))
			return result
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async getOrder(id: number): Promise<OrderDTO> {
		const query = `SELECT * FROM orders WHERE id = ?`
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

			return result as OrderDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async getOrderHistoryByUserId(user_id: number): Promise<OrderDTO[]> {
		const query = `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`
		const values = [user_id]

		try {
			const results = await new Promise<any[]>((resolve, reject) => {
				connection.query(query, values, (error, rows) => {
					if (error) {
						reject(error)
					} else {
						resolve(rows)
					}
				})
			})

			const orderHistory: OrderDTO[] = results.map((row) => this.mapRowToOrderDTO(row))

			return orderHistory
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	// public async updateOrder(dto: UpdateOrderDTO): Promise<OrderDTO> {
	// 	const query = `UPDATE orders SET user_id = ?, content = ? WHERE id = ?`
	// 	const values = [dto.user_id, dto.target_address, dto.id]

	// 	try {
	// 		const insertResult = await new Promise((resolve, reject) => {
	// 			connection.query(query, values, (error, results) => {
	// 				if (error) {
	// 					reject(error)
	// 				} else {
	// 					resolve(results)
	// 				}
	// 			})
	// 		})

	// 		const selectQuery = `SELECT * FROM orders WHERE id = ?`

	// 		const selectResult = await new Promise((resolve, reject) => {
	// 			connection.query(selectQuery, [insertResult], (selectError, selectResults) => {
	// 				if (selectError) {
	// 					reject(selectError)
	// 				} else {
	// 					resolve(selectResults)
	// 				}
	// 			})
	// 		})

	// 		console.log('주문 수정 후 조회 ::: ', selectResult[0])

	// 		return selectResult[0] as OrderDTO
	// 	} catch (e) {
	// 		console.error(e)
	// 		throw e
	// 	}
	// }
}
export interface IOrderRepository {
	createOrder(dto: CreateOrderDTO): Promise<OrderDTO>
	getOrdersForDate(startDate: Date, endDate: Date): Promise<any[]>
	getOrder(dto: number): Promise<OrderDTO>
	getOrderHistoryByUserId(user_id: number): Promise<OrderDTO[]>
	// updateOrder(dto: UpdateOrderDTO): Promise<OrderDTO>
}
