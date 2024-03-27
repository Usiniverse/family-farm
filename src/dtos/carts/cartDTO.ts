import { LineItemDTO } from '../lineItems/lineItemDTO'
import { ProductDTO } from '../products/productDTO'

export interface CartDTO {
	id: number
	user_id: number
	created_at: Date
	updated_at: Date
	line_items?: LineItemDTO[]
}
