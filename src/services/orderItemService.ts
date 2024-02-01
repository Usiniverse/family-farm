import { CreateOrderItemDTO } from '../dtos/orderItems/createOrderItemDTO'
import { OrderItemDTO } from '../dtos/orderItems/orderItemDTO'
import { IOrderItemRepository } from '../repositorys/orderItemRepository'

export class OrderItemService {
	private orderItemRepository: IOrderItemRepository

	constructor(orderItemRepository: IOrderItemRepository) {
		this.orderItemRepository = orderItemRepository
	}

	/**
	 * 주문 상품 생성 API
	 * @param dto
	 * @returns OrderItemDTO
	 */
	public async createOrderItemService(dto: CreateOrderItemDTO): Promise<OrderItemDTO> {
		const result = await this.orderItemRepository.createOrderItem(dto)

		return result
	}
}
