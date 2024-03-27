import { ProductDTO } from '../products/productDTO'

export interface LineItemDTO {
	id: number
	cart_id: number
	product_id: number
	quantity: number
	created_at: Date
	updated_at: Date
	product?: ProductDTO
}
