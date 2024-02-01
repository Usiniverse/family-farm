import { OrderItemDTO } from '../orderItems/orderItemDTO'

export interface OrderDTO {
	id: number
	user_id: number
	target_address: string
	target_phone_number: string
	product_id: number
	created_at: Date
	updated_at: Date
	order_items?: OrderItemDTO[]
}
