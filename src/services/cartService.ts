import { CreateCartDTO } from '../dtos/carts/CreateCartDTO'
import { CartDTO } from '../dtos/carts/cartDTO'
import { ICartRepository } from '../repositorys/cartRepository'

export class CartService {
	private cartRepository: ICartRepository

	constructor(cartRepository: ICartRepository) {
		this.cartRepository = cartRepository
	}

	public async createCart(dto: CreateCartDTO): Promise<CartDTO> {
		const totalPrice = dto.price * dto.quantity

		dto.price = totalPrice

		const result = await this.cartRepository.createCart(dto)

		return result
	}

	public async getCarts(user_id: number): Promise<CartDTO[]> {
		const result = await this.cartRepository.getCarts(user_id)

		console.log('서비스 ::: ', result)

		return result
	}

	public async deleteCart(cart_id: number, user_id: number): Promise<CartDTO> {
		return
	}

	public async updateCart(cart_id: number, user_id: number): Promise<CartDTO> {
		return
	}
}
