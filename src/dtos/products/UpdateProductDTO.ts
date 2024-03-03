export interface UpdateProductDTO {
	product_name: string
	price: number
	weight: string
	images?: {
		img_url: string
	}
}
