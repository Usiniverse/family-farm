import { CreateProductDTO } from '../dtos/products/createProductDTO'
import { ProductDTO } from '../dtos/products/productDTO'
import { UpdateProductDTO } from '../dtos/products/UpdateProductDTO'
import { ProductRepository } from '../repositorys/productRepository'

export class ProductService {
	private productRepository: ProductRepository

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository
	}

	public async createProduct(dto: CreateProductDTO): Promise<ProductDTO> {
		const result = await this.productRepository.createProduct(dto)

		return result
	}

	public async getProduct(id: number): Promise<ProductDTO> {
		const result = await this.productRepository.getProduct(id)

		return result
	}

	public async getProducts(): Promise<ProductDTO[]> {
		const result = await this.productRepository.getProducts()

		return result
	}

	public async updateProduct(id: number, dto: UpdateProductDTO): Promise<ProductDTO> {
		const result = await this.productRepository.updateProduct(id, dto)

		return result
	}

	public async deleteProduct(id: number): Promise<ProductDTO> {
		const result = await this.productRepository.deleteProduct(id)

		return result
	}
}
