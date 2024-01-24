import { CustomExpressRequest } from '../../shared/lib/expressRequest'
import express, { Response } from 'express'
import { CreateCartDTO } from '../dtos/carts/CreateCartDTO'
import { CartService } from '../services/cartService'
import { cartService } from '../services'

export class CartController {
	private cartService: CartService

	constructor(cartService: CartService) {
		this.cartService = cartService
	}

	public async createCart(req: CustomExpressRequest, res: Response) {
		const user_id = req.auth.id

		const dto: CreateCartDTO = { user_id, ...req.body }

		const result = await cartService.createCart(dto)

		return res.status(201).json(result)
	}

	public async getCarts(req: CustomExpressRequest, res: Response) {
		const user_id = req.auth.id
		console.log(user_id)

		const result = await cartService.getCarts(user_id)
		console.log('컨트롤러::: ', result)

		return res.status(200).json(result)
	}

	public async deleteCart(req: CustomExpressRequest, res: Response) {
		const user_id = req.auth.id
		const { cart_id } = req.body

		const result = await cartService.deleteCart(cart_id, user_id)

		return res.status(200).json(result)
	}

	public async updateCart(req: CustomExpressRequest, res: Response) {
		const user_id = req.auth.id
		const { cart_id } = req.body

		const result = await cartService.updateCart(cart_id, user_id)

		return res.status(200).json(result)
	}
}
