import { ServiceError } from '../../shared/error/error'
import { CreateCartDTO } from '../dtos/carts/CreateCartDTO'
import { CartDTO } from '../dtos/carts/cartDTO'
import { UpdateCartDTO } from '../dtos/carts/updateCartDTO'
import { lineItemsRepository } from '../repositorys'
import { ICartRepository } from '../repositorys/cartRepository'
import { ILineItemsRepository } from '../repositorys/lineItemsRepository'
import { IProductRepository } from '../repositorys/productRepository'

export class CartService {
	private cartRepository: ICartRepository
	private productRepository: IProductRepository
	private lineItemsRepository: ILineItemsRepository

	constructor(
		cartRepository: ICartRepository,
		productRepository: IProductRepository,
		lineItemsRepository: ILineItemsRepository,
	) {
		this.cartRepository = cartRepository
		this.productRepository = productRepository
		this.lineItemsRepository = lineItemsRepository
	}

	public async createCart(dto: CreateCartDTO): Promise<CartDTO | ServiceError> {
		try {
			const cart = await this.cartRepository.getCartByUserId(dto.user_id)
			const product = await this.productRepository.getProduct(dto.product_id)

			// 장바구니가 없다면 새로 생성함
			if (!cart) {
				const cart = await this.cartRepository.createCart(dto)
				const lineItems = await lineItemsRepository.createLineItem({
					cart_id: cart.id,
					product_id: dto.product_id,
					quantity: dto.quantity,
				})
				lineItems.product = product
				cart.line_items = [lineItems]

				return cart
			} else {
				// 장바구니가 있다면 찾아서 상품 추가
				const lineItems = await lineItemsRepository.getLineItemByCartId(cart.id)
				const checkArray = lineItems.find((v) => v.product_id === dto.product_id)

				if (checkArray) {
					// 이미 상품이 있으면 장바구니 상품의 수량을 수정함
					console.log('장바구니 수량 수정 ::: ')

					await lineItemsRepository.updateLineItem({
						cart_id: cart.id,
						quantity: dto.quantity,
						product_id: dto.product_id,
					})
				} else {
					console.log('장바구니 상품 생성 ::: ')
					// 장바구니에 상품이 없다면 상품을 추가함
					await lineItemsRepository.createLineItem({
						cart_id: cart.id,
						product_id: dto.product_id,
						quantity: dto.quantity,
					})
				}

				const result = await this.cartRepository.getCartByUserId(dto.user_id)
				const lineItem = await lineItemsRepository.getLineItemByCartId(cart.id)

				for (let i = 0; i < lineItem.length; i++) {
					const product = await this.productRepository.getProduct(lineItem[i].product_id)
					lineItem[i].product = product
				}

				result.line_items = lineItem

				console.log('push 후 라인아이템 ::: ', lineItem)

				return result
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	// cart 안에 line_items 리스트
	public async getCarts(user_id: number): Promise<CartDTO | ServiceError> {
		try {
			const cart = await this.cartRepository.getCartByUserId(user_id)
			if (!cart) {
				return { message: '장바구니가 비어있습니다.' }
			}

			const lineItems = await lineItemsRepository.getLineItemByCartId(cart.id)
			if (!lineItems) {
				return { message: '장바구니가 비어있습니다.' }
			}

			for (let i = 0; i < lineItems.length; i++) {
				const product = await this.productRepository.getProduct(lineItems[i].product_id)
				lineItems[i].product = product
			}

			cart.line_items = lineItems

			return cart
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

	public async updateCart(dto: UpdateCartDTO): Promise<CartDTO | ServiceError> {
		try {
			const cart = await this.cartRepository.getCart(dto.cart_id)
			if (!cart) {
				return { message: '장바구니를 찾을 수 없습니다.' }
			}

			const product = await this.productRepository.getProduct(dto.product_id)
			if (!product) {
				return { message: '상품을 찾을 수 없습니다.' }
			}

			const lineItems = await lineItemsRepository.updateLineItem({
				quantity: dto.quantity,
				product_id: dto.product_id,
				cart_id: dto.cart_id,
			})

			lineItems.product = product
			cart.line_items = [lineItems]

			return cart
		} catch (error) {
			console.error(error)
			throw error
		}
	}
}
