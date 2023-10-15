import { CreateOrderDTO } from '../dtos/orders/createOrderDTO'
import { OrderDTO } from '../dtos/orders/orderDTO'
import { client } from '../../shared/lib/db'
import { UpdateOrderDTO } from '../dtos/orders/updateOrderDTO'
import { connection } from '../../shared/lib/db'

export class OrderRepository implements IOrderRepository {
	public async createOrder(dto: CreateOrderDTO): Promise<OrderDTO> {
		const query = `INSERT INTO orders (user_id, order_count, target_address, product_id) VALUES (?, ?, ?, ?)`
		const values = [dto.user_id, dto.order_count, dto.target_address, dto.product_id]

		try {
			const insertResult: any = await new Promise((resolve, reject) => {
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
				connection.query(
					selectQuery,
					[insertResult.insertId],
					(selectError, selectResults) => {
						if (selectError) {
							reject(selectError)
						} else {
							resolve(selectResults)
						}
					},
				)
			})

			console.log('주문 생성 후 조회 ::: ', selectResult[0])

			return selectResult[0] as OrderDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async getOrder(id: number): Promise<OrderDTO> {
		const query = `SELECT * FROM orders WHERE id = ?`
		const values = [id]

		try {
			const result = await client.query(query, values)
			client.end()

			return result.rows[0] as OrderDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async getOrderHistoryByUserId(user_id: number): Promise<OrderDTO[]> {
		const query = `SELECT * FROM orders WHERE user_id = $1`
		const values = [user_id]

		try {
			const result = await client.query(query, values)
			console.log('유저 주문 조회 완료 :::', result.rows)

			client.end()

			return result.rows[0] as OrderDTO[]
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async updateOrder(dto: UpdateOrderDTO): Promise<OrderDTO> {
		const query = `UPDATE posts SET user_id = $2, order_count = $3, content = $4 WHERE id = $1 RETURNING *`
		const values = [dto.id, dto.user_id, dto.order_count, dto.target_address]

		try {
			const result = await client.query(query, values)
			console.log('주문 생성 완료 :::', result.rows)

			client.end()

			return result.rows[0] as OrderDTO
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
