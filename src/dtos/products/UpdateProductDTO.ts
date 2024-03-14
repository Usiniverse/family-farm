export interface UpdateProductDTO {
	product_name: string
	price: number
	weight: string
	is_opened: boolean
	images?: {
		img_url: string
	}
}
