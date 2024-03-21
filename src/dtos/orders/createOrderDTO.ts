import { CartDTO } from '../carts/cartDTO'
import { OrderItemDTO } from '../orderItems/orderItemDTO'

export interface CreateOrderDTO {
	id: number
	user_id: number
	order_name: string
	order_address: string
	order_phone_number: string
	delivery_name: string
	delivery_address: string
	delivery_phone_number: string
	delivery_message?: string
	created_at: Date
	updated_at: Date
	carts?: CartDTO[]
	order_items?: OrderItemDTO[]
}
