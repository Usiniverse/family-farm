export interface Cart {
	id: number
	user_id: number
	product_id: number
	quantity: number
	product_image?: string
	price: number
	created_at: Date
	updated_at: Date
}
