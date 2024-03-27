import { ProductDTO } from '../products/productDTO'

export interface CreateCartDTO {
	user_id: number
	product_id: number
	quantity: number
	product?: ProductDTO
}
