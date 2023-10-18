import { ProductDTO } from '../dtos/products/productDTO'
import { ProductRepository } from '../repositorys/productRepository'

export class ProductService {
	private productRepository: ProductRepository

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository
	}

	public async createProduct(dto): Promise<ProductDTO> {
		const result = await this.productRepository.createProduct(dto)

		return result
	}
}
