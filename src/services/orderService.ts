import { CreateOrderDTO } from '../dtos/orders/createOrderDTO'
import { OrderDTO } from '../dtos/orders/orderDTO'
import { IOrderRepository } from '../repositorys/orderRepository'

export class OrderService {
	private orderRepository: IOrderRepository

	constructor(orderRepository: IOrderRepository) {
		this.orderRepository = orderRepository
	}

	public async createOrder(dto: CreateOrderDTO): Promise<OrderDTO> {
		// 1. 상품 페이지
		// 2. 상품 선택 후 주문 요청 버튼 클릭
		// 상품 정보를 가져와서 body로 넘김
		// 다시 상품 조회할 필요 없음
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
