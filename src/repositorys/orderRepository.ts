import { CreateOrderDTO } from '../dtos/orders/createOrderDTO'
import { OrderDTO } from '../dtos/orders/orderDTO'
import { client } from '../../shared/lib/db'

export class OrderRepository implements IOrderRepository {
	public async createOrder(dto: CreateOrderDTO): Promise<OrderDTO> {
		const query = `INSERT INTO orders (user_id, order_count, target_address) VALUES ($1, $2, $3) RETURNING *`
		const values = [dto.user_id, dto.order_count, dto.target_address]

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

	public async getOrder(id: number): Promise<OrderDTO> {
		const query = `SELECT * FROM orders WHERE id = $1`
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
			console.log('주문 생성 완료 :::', result.rows)

			client.end()

			return result.rows[0] as OrderDTO[]
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
}
