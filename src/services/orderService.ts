import { CreateOrderDTO } from '../dtos/orders/createOrderDTO'
import { OrderDTO } from '../dtos/orders/orderDTO'
import { IOrderRepository } from '../repositorys/orderRepository'
import { productService } from '../services'
import { ServiceError } from '../../shared/error/error'

export class OrderService {
	private orderRepository: IOrderRepository

	constructor(orderRepository: IOrderRepository) {
		this.orderRepository = orderRepository
	}

	public async createOrder(dto: CreateOrderDTO): Promise<OrderDTO | ServiceError> {
		const product = await productService.getProduct(dto.product_id)

		if (!product) {
			return { message: '상품을 찾을 수 없습니다.' }
		}

		const order = await this.orderRepository.getOrderHistoryByUserId(dto.user_id)

		if (!dto.target_address) {
			dto.target_address = order[0].target_address
		}

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
