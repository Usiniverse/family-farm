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

		const orderHistory = await this.orderRepository.getOrderHistoryByUserId(dto.user_id)

		// 주소가 없다면 이전 주소를 입력
		if (!dto.target_address) {
			dto.target_address = orderHistory[0].target_address
		}

		// 이전에 1번이라도 주문한 적이 있다면 주문횟수를 1 더하기
		if (orderHistory.length > 0) {
			dto.order_count = orderHistory[0].order_count + 1
		} else {
			dto.order_count = 1
		}

		try {
			const result = await this.orderRepository.createOrder(dto)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async getOrder(id: number): Promise<OrderDTO> {
		return await this.orderRepository.getOrder(id)
	}

	public async getOrderHistoryByUserId(user_id: number): Promise<OrderDTO[]> {
		return await this.orderRepository.getOrderHistoryByUserId(user_id)
	}
}
