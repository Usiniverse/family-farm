import { ProductDTO } from '../products/productDTO'

export interface CartDTO {
	user_id: number
	product_id: number
	quantity: number
	product_image?: string
	price: number
	product?: ProductDTO
}
