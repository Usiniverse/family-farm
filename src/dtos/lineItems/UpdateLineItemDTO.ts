import { ProductDTO } from '../products/productDTO'

export interface UpdateLineItemDTO {
	cart_id?: number
	product_id?: number
	quantity: number
	product?: ProductDTO
}
