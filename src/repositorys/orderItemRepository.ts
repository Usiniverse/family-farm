import { connection } from '../../shared/lib/db'
import { CreateOrderItemDTO } from '../dtos/orderItems/createOrderItemDTO'
import { OrderItemDTO } from '../dtos/orderItems/orderItemDTO'

export class OrderItemRepository implements IOrderItemRepository {
	public mapRowToOrderItemDTO(row: any): OrderItemDTO {
		return {
			id: row.id,
			order_id: row.order_id,
			product_id: row.product_id,
			quantity: row.quantity,
			order_price: row.order_price,
			created_at: row.created_at,
			updated_at: row.updated_at,
		}
	}

	public async createOrderItem(dto: CreateOrderItemDTO): Promise<OrderItemDTO> {
		const query = `INSERT INTO order_items (order_id, product_id, quantity, order_price) VALUES (?, ?, ?, ?)`
		const values = [dto.order_id, dto.product_id, dto.quantity, dto.order_price]

		const result = await new Promise((resolve, reject) => {
			connection.query(query, values, (error, results) => {
				if (error) {
					reject(error)
				} else {
					resolve(results.insertId)
				}
			})
		})

		const selectQuery = `SELECT * FROM order_items WHERE id = ?`

		const selectResult = await new Promise<OrderItemDTO>((resolve, reject) => {
			connection.query(selectQuery, [result], (selectError, selectResults) => {
				if (selectError) {
					reject(selectError)
				} else {
					resolve(this.mapRowToOrderItemDTO(selectResults[0]))
				}
			})
		})

		return selectResult as OrderItemDTO
	}

	public async getOrderItemByOrderId(id: number): Promise<OrderItemDTO[]> {
		const query = `SELECT * FROM order_items WHERE order_id = ? ORDER BY created_at DESC`
		const values = [id]

		const result = await new Promise((resolve, reject) => {
			connection.query(query, values, (error, results) => {
				if (error) {
					reject(error)
				} else {
					resolve(results)
				}
			})
		})

		return result as OrderItemDTO[]
	}
}

export interface IOrderItemRepository {
	createOrderItem(dto: CreateOrderItemDTO): Promise<OrderItemDTO>
	getOrderItemByOrderId(id: number): Promise<OrderItemDTO[]>
}
