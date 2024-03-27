import { ProductDTO } from '../products/productDTO'

export interface UpdateCartDTO {
	cart_id: number
	user_id?: number
	quantity: number
	product_id?: number
	product?: ProductDTO
}
