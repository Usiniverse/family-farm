import { ProductDTO } from '../products/productDTO'

export interface LineItemDTO {
	id: number
	cart_id: number
	product_id: number
	product_name?: string
	price?: number
	quantity: number
	created_at: Date
	updated_at: Date
	product?: ProductDTO
}
