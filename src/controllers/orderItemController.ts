import { OrderItemService } from '../services/orderItemService'
import { CustomExpressRequest } from '../../shared/lib/expressRequest'
import { Response } from 'express'

export class OrderItemController {
	private orderItemService: OrderItemService

	constructor(orderItemService: OrderItemService) {
		this.orderItemService = orderItemService
	}

	public async createOrderItem(req: CustomExpressRequest, res: Response) {
		const dto = { ...req.body }

		const result = await this.orderItemService.createOrderItemService(dto)

		if (!result) {
			return res.status(400).json({ message: '주문이 취소되었습니다.' })
		}

		return res.status(201).json(result)
	}
}
