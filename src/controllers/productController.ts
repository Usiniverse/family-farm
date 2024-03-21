import { CustomExpressRequest } from '../../shared/lib/expressRequest'
import { CreateProductDTO } from '../dtos/products/createProductDTO'
import { UserRepository } from '../repositorys/userRepository'
import { productService } from '../services'
import express, { Response } from 'express'

export class ProductController {
	private userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	public async createProduct(req: CustomExpressRequest, res: Response) {
		const user_id = req.auth.id

		const dto: CreateProductDTO = { user_id, ...req.body }

		const result = await productService.createProduct(dto)

		return res.status(200).send(result)
	}

	public async getProduct(req: CustomExpressRequest, res: Response) {
		const id = req.params.id

		const result = await productService.getProduct(+id)

		return res.status(200).send(result)
	}

	public async getProducts(req: CustomExpressRequest, res: Response) {
		const result = await productService.getProducts()

		return res.status(200).send(result)
	}

	public async updateProduct(req: CustomExpressRequest, res: Response) {
		const product_id = +req.params.id
		const result = await productService.updateProduct(product_id, req.body)

		return res.status(200).send(result)
	}

	public async deleteProduct(req: CustomExpressRequest, res: Response) {
		const product_id = +req.params.id
		const result = await productService.deleteProduct(product_id)

		return res.status(200).send(result)
	}
}
