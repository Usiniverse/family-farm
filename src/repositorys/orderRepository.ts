import { CreateOrderDTO } from '../dtos/orders/createOrderDTO'
import { OrderDTO } from '../dtos/orders/orderDTO'
import { UpdateOrderDTO } from '../dtos/orders/updateOrderDTO'
import { connection } from '../../shared/lib/db'

export class OrderRepository implements IOrderRepository {
	private mapRowToOrderDTO(row: any): OrderDTO {
		return {
			id: row.id,
			user_id: row.user_id,
			target_address: row.target_address,
			product_id: row.product_id,
			created_at: row.created_at,
			updated_at: row.updated_at,
		}
	}

	public async createOrder(dto: CreateOrderDTO): Promise<OrderDTO> {
		const query = `INSERT INTO orders (user_id, target_address, product_id) VALUES (?, ?, ?)`
		const values = [dto.user_id, dto.target_address, dto.product_id]

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

	public async updateOrder(dto: UpdateOrderDTO): Promise<OrderDTO> {
		const query = `UPDATE orders SET user_id = ?, content = ? WHERE id = ?`
		const values = [dto.user_id, dto.target_address, dto.id]

		try {
			const insertResult = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			const selectQuery = `SELECT * FROM orders WHERE id = ?`

			const selectResult = await new Promise((resolve, reject) => {
				connection.query(selectQuery, [insertResult], (selectError, selectResults) => {
					if (selectError) {
						reject(selectError)
					} else {
						resolve(selectResults)
					}
				})
			})

			console.log('주문 수정 후 조회 ::: ', selectResult[0])

			return selectResult[0] as OrderDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}
}
export interface IOrderRepository {
	createOrder(dto: CreateOrderDTO): Promise<OrderDTO>
	getOrder(dto: number): Promise<OrderDTO>
	getOrderHistoryByUserId(user_id: number): Promise<OrderDTO[]>
	updateOrder(dto: UpdateOrderDTO): Promise<OrderDTO>
}
