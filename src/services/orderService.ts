import { CreateOrderDTO } from '../dtos/orders/createOrderDTO'
import { OrderDTO } from '../dtos/orders/orderDTO'
import { IOrderRepository } from '../repositorys/orderRepository'

export class OrderService {
	private orderRepository: IOrderRepository
	public async createOrder(dto: CreateOrderDTO): Promise<OrderDTO> {
		return await this.orderRepository.createOrder(dto)
	}

	public async getOrder(id: number): Promise<OrderDTO> {
		return await this.orderRepository.getOrder(id)
	}

	// public async getOrders(id: number): Promise<OrderDTO[]> {
	// 	return await this.orderRepository.getOrders(id)
	// }
}
