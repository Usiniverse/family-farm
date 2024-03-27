import { LineItemDTO } from '../dtos/lineItems/lineItemDTO'
import { CreateLineItemDTO } from '../dtos/lineItems/createLineItemDTO'
import { UpdateLineItemDTO } from '../dtos/lineItems/UpdateLineItemDTO'
import { connection } from '../../shared/lib/db'

export class LineItemsRepository implements ILineItemsRepository {
	// public mapRowToLineItemDTO(row: any): LineItemDTO {
	// 	return {
	// 		id: row.id,
	// 		cart_id: row.cart_id,
	// 		product_id: row.product_id,
	// 		quantity: row.quantity,
	// 		created_at: row.created_at,
	// 		updated_at: row.updated_at,
	// 	}
	// }

	public async createLineItem(dto: CreateLineItemDTO): Promise<LineItemDTO> {
		const query = `INSERT INTO line_items (cart_id, product_id, quantity) VALUES (?, ?, ?)`
		const values = [dto.cart_id, dto.product_id, dto.quantity]

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

			const selectQuery = `SELECT * FROM line_items WHERE id = ?`

			const selectResult = await new Promise((resolve, reject) => {
				connection.query(selectQuery, [result], (selectError, selectResults) => {
					if (selectError) {
						reject(selectError)
					} else {
						resolve(selectResults)
					}
				})
			})

			return selectResult[0] as LineItemDTO
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async getLineItemByCartId(cart_id: number): Promise<LineItemDTO[]> {
		const query = `SELECT * FROM line_items WHERE cart_id = ?`
		const value = [cart_id]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, value, (error, result) => {
					if (error) {
						reject(error)
					} else {
						resolve(result)
					}
				})
			})

			return result as LineItemDTO[]
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async updateLineItem(dto: UpdateLineItemDTO): Promise<LineItemDTO> {
		const query = `UPDATE line_items SET quantity = ? WHERE cart_id = ? AND product_id = ?`
		const value = [dto.quantity, dto.cart_id, dto.product_id]

		try {
			await new Promise((resolve, reject) => {
				connection.query(query, value, (error, result) => {
					if (error) {
						reject(error)
					} else {
						resolve(result)
					}
				})
			})

			const selectQuery = `SELECT * FROM line_items WHERE cart_id = ? AND product_id = ?`
			const id = [dto.cart_id, dto.product_id]

			const selectResult = await new Promise((resolve, reject) => {
				connection.query(selectQuery, id, (selectError, selectResults) => {
					if (selectError) {
						reject(selectError)
					} else {
						resolve(selectResults[0])
					}
				})
			})

			return selectResult as LineItemDTO
		} catch (error) {
			console.error(error)
			throw error
		}
	}
}

export interface ILineItemsRepository {
	createLineItem(dto: CreateLineItemDTO): Promise<LineItemDTO>
	getLineItemByCartId(cart_id: number): Promise<LineItemDTO[]>
	updateLineItem(dto: UpdateLineItemDTO): Promise<LineItemDTO>
}
