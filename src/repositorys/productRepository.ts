import { ProductDTO } from '../dtos/products/productDTO'
import { CreateProductDTO } from '../dtos/products/createProductDTO'
import { connection } from '../../shared/lib/db'
import { RowDataPacket } from 'mysql2'

export class ProductRepository implements IProductRepository {
	public async createProduct(dto: CreateProductDTO): Promise<ProductDTO> {
		const query = `
			INSERT INTO products (product_name, price, weight)
			VALUES (?, ?, ?)`
		const values = [dto.product_name, dto.price, dto.weight]

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

			const selectUserQuery = `SELECT * FROM products where id = ?`
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

			return selectUser[0] as ProductDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async getProduct(id: number): Promise<ProductDTO> {
		const query = `SELECT * FROM products WHERE id = ?`
		const values = [id]

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

			return result[0] as ProductDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	// public async getProductsByUserId(user_id: number): Promise<ProductDTO[]> {
	// 	const query = `SELECT * FROM products WHERE user_id = ?`
	// 	const values = [user_id]

	// 	try {
	// 		const result = await new Promise<RowDataPacket>((resolve, reject) => {
	// 			connection.query(query, values, (error, results) => {
	// 				if (error) {
	// 					reject(error)
	// 				} else {
	// 					resolve(results)
	// 				}
	// 			})
	// 		})

	// 		return result as ProductDTO[]
	// 	} catch (e) {
	// 		console.error(e)
	// 		throw e
	// 	}
	// }

	public async getProducts(): Promise<ProductDTO[]> {
		const query = `SELECT * FROM products`

		try {
			const result = await new Promise<RowDataPacket>((resolve, reject) => {
				connection.query(query, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return result as ProductDTO[]
		} catch (e) {
			console.error(e)
			throw e
		}
	}
}

export interface IProductRepository {
	createProduct(dto: CreateProductDTO): Promise<ProductDTO>
	getProduct(id: number): Promise<ProductDTO>
	// getProductsByUserId(user_id: number): Promise<ProductDTO[]>
	getProducts(): Promise<ProductDTO[]>
}
