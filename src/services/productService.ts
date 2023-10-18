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

	public async getProduct(id: number): Promise<ProductDTO> {
		const result = await this.productRepository.getProduct(id)

		return result
	}

	public async getProductsByUserId(user_id: number): Promise<ProductDTO[]> {
		const result = await this.productRepository.getProductsByUserId(user_id)

		return result
	}
}
