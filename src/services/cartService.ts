import { log } from 'console'
import { CreateCartDTO } from '../dtos/carts/CreateCartDTO'
import { CartDTO } from '../dtos/carts/cartDTO'
import { UpdateCartDTO } from '../dtos/carts/updateCartDTO'
import { ICartRepository } from '../repositorys/cartRepository'
import { IProductRepository } from '../repositorys/productRepository'

export class CartService {
	private cartRepository: ICartRepository
	private productRepository: IProductRepository

	constructor(cartRepository: ICartRepository, productRepository: IProductRepository) {
		this.cartRepository = cartRepository
		this.productRepository = productRepository
	}

	public async createCart(dto: CreateCartDTO): Promise<CartDTO> {
		try {
			const product = await this.productRepository.getProduct(dto.product_id)
			const totalPrice = product.price * dto.quantity

			dto.price = totalPrice

			const result = await this.cartRepository.createCart(dto)

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async getCarts(user_id: number): Promise<CartDTO[]> {
		try {
			const result = await this.cartRepository.getCarts(user_id)

			// for (let i = 0; i < result.length; i++) {
			// 	// const product = await this.productRepository.getProduct(result[i].product_id)
			// 	// result[i].product = product
			// 	for (let j = 0; j < result.length; j++) {
			// 		if (result[i].product_id === result[j].product_id) {
			// 			result[i].quantity = result[i].quantity + result[j].quantity;
			// 		}
			// 	}
			// }

			const aggregatedCart = []
			result.forEach((cart) => {
				const { product_id, price, quantity } = cart
				if (aggregatedCart[product_id]) {
					aggregatedCart[product_id].price += price
					aggregatedCart[product_id].quantity += quantity
				} else {
					aggregatedCart[product_id] = { ...cart, price, quantity }
				}
			})

			const groupedCart = aggregatedCart.filter((v) => v !== undefined)
			console.log('상품 묶기 ::: ', groupedCart)

			return groupedCart
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async deleteCart(cart_id: number, user_id: number): Promise<CartDTO | string> {
		try {
			// 유저 검사
			const getCart = await this.cartRepository.getCart(cart_id)

			if (getCart.user_id !== user_id) {
				return '잘못된 요청입니다.'
			}

			const result = await this.cartRepository.deleteCart(cart_id)

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async updateCart(dto: UpdateCartDTO): Promise<CartDTO> {
		try {
			const cart = await this.cartRepository.getCartByUserId(dto.user_id)

			const product = await this.productRepository.getProduct(dto.product_id)

			// 수량 조절 시 기존 DB와 맞지 않으면 수정해주기
			if (cart.quantity !== dto.quantity) {
				dto.price = dto.quantity * product.price
				const result = await this.cartRepository.updateCart(dto)
				return result
			} else {
				// 기존과 수량이 같다면 수정할 필요 없음.
				return
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}
}
