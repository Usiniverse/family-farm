import { OrderItemService } from '../services/orderItemService'
import { CustomExpressRequest } from '../../shared/lib/expressRequest'
import { Response } from 'express'

export class OrderItemController {
	private orderItemService: OrderItemService

	constructor(orderItemService: OrderItemService) {
		this.orderItemService = orderItemService
	}

	public async createOrderItem(req: CustomExpressRequest, res: Response) {
		const user_id = req.auth.id
		const dto = { ...req.body }

		const result = await this.orderItemService.createOrderItemService(dto)

		return res.status(201).json(result)
	}
}
