export interface CreateProductDTO {
	product_name: string
	price: number
	weight: string
	images?: {
		img_url: string
	}
}
