import { ProductDTO } from '../dtos/products/productDTO'
import { CreateProductDTO } from '../dtos/products/createProductDTO'

export class ProductRepository implements IProductRepository {}

interface IProductRepository {
	createProduct(dto: CreateProductDTO): Promise<ProductDTO>
	getProduct(id: number): Promise<ProductDTO>
	getProducts(): Promise<ProductDTO[]>
}
