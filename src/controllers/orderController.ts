import { CustomExpressRequest } from '../../shared/lib/expressRequest'
import { UserRepository } from '../repositorys/userRepository'
import { OrderService } from '../services/orderService'
import { orderService } from '../services'
import express, { Response } from 'express'
import { CreateOrderDTO } from '../dtos/orders/createOrderDTO'

export class OrderController {
	private userRepository: UserRepository
	private orderService: OrderService

	constructor(userRepository: UserRepository, orderService: OrderService) {
		userRepository = this.userRepository
		orderService = this.orderService
	}

	public async createOrder(req: CustomExpressRequest, res: Response) {
		const user_id = req.auth.id

		const dto: CreateOrderDTO = { user_id, ...req.body }

		const result = await orderService.createOrder(dto)

		return res.status(201).json(result)
	}

	public async getOrder(req: CustomExpressRequest, res: Response) {
		const user_id = req.auth.id
		const id = req.params.id
		// 유저의 id와 주문의 id를 받아옴
		// 주문 리스트에서 확인하기?
		const result = await orderService.getOrder(+id)

		return res.status(201).json(result)
	}

	public async getOrderHistoryByUserId(req: CustomExpressRequest, res: Response) {
		const user_id = req.auth.id

		// 해당 유저의 전체 정보
		const result = await orderService.getOrderHistoryByUserId(user_id)

		return res.status(201).json(result)
	}
}
