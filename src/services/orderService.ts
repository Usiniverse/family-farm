import { CreateOrderDTO } from '../dtos/orders/createOrderDTO'
import { OrderDTO } from '../dtos/orders/orderDTO'
import { IOrderRepository } from '../repositorys/orderRepository'
import { cartService, productService } from '../services'
import { ServiceError } from '../../shared/error/error'
import { orderItemRepository, productRepository } from '../repositorys'

export class OrderService {
	private orderRepository: IOrderRepository

	constructor(orderRepository: IOrderRepository) {
		this.orderRepository = orderRepository
	}

	/**
	 * 주문서 생성 API
	 */
	public async createOrder(dto: CreateOrderDTO): Promise<OrderDTO | ServiceError> {
		const product = await productService.getProduct(dto.product_id)

		if (!product) {
			return { message: '상품을 찾을 수 없습니다.' }
		}

		if (!dto.target_address) {
			return { message: '주소를 입력해주세요.' }
		}

		try {
			const result = await this.orderRepository.createOrder(dto)
			console.log('주문완료::: ', result)

			// 장바구니를 만들고 수량만큼 배열을 생성함.
			// const carts = await cartService.getCarts(dto.user_id)
			// console.log('결과 ::: ', carts)

			// carts.map((cart) => {
			// 	cart.
			// })
			/**
			 * 장바구니 상품이 서로 다를 경우 : 같은 상품을 묶어서 order_items 생성.
			 * 같을 경우 : 같은대로 order_items 생성
			 */

			// // 상품 가격 확인을 위해 상품 검색
			// const product = await productRepository.getProduct(result.id)

			// // 반복문으로 order_items 생성
			// const createOrderItems = await orderItemRepository.createOrderItem({
			// 	order_id: result.id,
			// 	product_id: result.product_id,
			// 	quantity: cart.length,
			// 	order_price: product.id,
			// })

			return result as OrderDTO
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
