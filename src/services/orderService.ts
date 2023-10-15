import { CreateOrderDTO } from '../dtos/orders/createOrderDTO'
import { OrderDTO } from '../dtos/orders/orderDTO'
import { IOrderRepository } from '../repositorys/orderRepository'

export class OrderService {
	private orderRepository: IOrderRepository

	constructor(orderRepository: IOrderRepository) {
		this.orderRepository = orderRepository
	}

	public async createOrder(dto: CreateOrderDTO): Promise<OrderDTO> {
		const result = await this.orderRepository.createOrder(dto)

		return result
	}

	public async getOrder(id: number): Promise<OrderDTO> {
		return await this.orderRepository.getOrder(id)
	}

	public async getOrderHistoryByUserId(user_id: number): Promise<OrderDTO[]> {
		return await this.orderRepository.getOrderHistoryByUserId(user_id)
	}
}
