export interface CreateCartDTO {
	user_id: number
	product_id: number
	quantity: number
	product_image?: string
	price: number
}
