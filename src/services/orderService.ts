import { CreateOrderDTO } from '../dtos/orders/createOrderDTO'
import { OrderDTO } from '../dtos/orders/orderDTO'
import { IOrderRepository } from '../repositorys/orderRepository'
import { cartService, productService } from '../services'
import { ServiceError } from '../../shared/error/error'
import { orderItemRepository, productRepository } from '../repositorys'
import { IOrderItemRepository } from '../repositorys/orderItemRepository'

export class OrderService {
	private orderRepository: IOrderRepository
	private orderItemRepository: IOrderItemRepository

	constructor(orderRepository: IOrderRepository, orderItemRepository: IOrderItemRepository) {
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
			/**
			 * 장바구니 상품이 서로 다를 경우 : 같은 상품을 묶어서 order_items 생성.
			 * 같을 경우 : 같은대로 order_items 생성
			 * 1. 주문 생성
			 * 2. 장바구니 조회
			 * 3. 같은 상품끼리 가격과 수량 맞추기
			 * 4. 반복문 순회하며 order_items(주문 수량) 생성하기
			 */
			const result = await this.orderRepository.createOrder(dto)

			const carts = await cartService.getCarts(dto.user_id)
			if (!carts) {
				return { message: '장바구니에 담긴 상품이 없습니다.' }
			}

			const aggregatedCart = []
			carts.forEach((cart) => {
				const { product_id, price, quantity } = cart
				if (aggregatedCart[product_id]) {
					aggregatedCart[product_id].price += price
					aggregatedCart[product_id].quantity += quantity
				} else {
					aggregatedCart[product_id] = { ...cart, price, quantity }
				}
			})

			const groupedCart = aggregatedCart.filter((v) => v !== undefined)

			// 반복문 돌면서 order_items 생성
			for (let i = 0; i < groupedCart.length; i++) {
				await orderItemRepository.createOrderItem({
					order_id: result.id,
					product_id: result.product_id,
					quantity: groupedCart[i].quantity,
					order_price: groupedCart[i].price,
				})
			}

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
