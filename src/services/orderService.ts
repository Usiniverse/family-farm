import { CreateOrderDTO } from '../dtos/orders/createOrderDTO'
import { OrderDTO } from '../dtos/orders/orderDTO'
import { IOrderRepository } from '../repositorys/orderRepository'
import { ServiceError } from '../../shared/error/error'
import { orderItemRepository, productRepository } from '../repositorys'
import { IOrderItemRepository } from '../repositorys/orderItemRepository'

export class OrderService {
	private orderRepository: IOrderRepository
	private orderItemRepository: IOrderItemRepository

	constructor(orderRepository: IOrderRepository, orderItemRepository: IOrderItemRepository) {
		this.orderRepository = orderRepository
		this.orderItemRepository = orderItemRepository
	}

	/**
	 * 주문서 생성 API
	 */
	public async createOrder(dto: CreateOrderDTO): Promise<OrderDTO | ServiceError> {
		if (!dto.delivery_address || !dto.order_address) {
			return { message: '주소를 입력해주세요.' }
		}
		/**
		 * order_items에 필요한 것
		 * 1. quantity
		 * 2. product_id
		 * 3. order_id
		 */
		try {
			const result = await this.orderRepository.createOrder(dto)

			for (let i = 0; i < dto.line_items.length; i++) {
				const product = await productRepository.getProduct(dto.line_items[i].product_id)
				this.orderItemRepository.createOrderItem({
					order_id: result.id,
					product_id: dto.line_items[i].product_id,
					quantity: dto.line_items[i].quantity,
					order_price: dto.line_items[i].quantity * product.price,
				})
			}
			const orderItems = await orderItemRepository.getOrderItemByOrderId(result.id)
			result.order_items = orderItems

			return result as OrderDTO
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async getOrder(id: number): Promise<OrderDTO> {
		try {
			const result = await this.orderRepository.getOrder(id)

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async getOrderHistoryByUserId(user_id: number): Promise<OrderDTO[]> {
		try {
			const result = await this.orderRepository.getOrderHistoryByUserId(user_id)

			for (let i = 0; i < result.length; i++) {
				const orderItem = await orderItemRepository.getOrderItemByOrderId(result[i].id)
				result[i].order_items = orderItem
			}

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}
}
