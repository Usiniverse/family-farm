export interface OrderDTO {
	id: number
	user_id: number
	target_address: string
	product_id: number
	order_count: number
	created_at: Date
	updated_at: Date
}
