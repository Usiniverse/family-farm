import { CreateCartDTO } from '../dtos/carts/CreateCartDTO'
import { CartDTO } from '../dtos/carts/cartDTO'

export class CartRepository implements ICartRepository {
	createCart(dto: CreateCartDTO): Promise<CartDTO> {
		return
	}

	getCarts(user_id: number): Promise<CartDTO[]> {
		return
	}

	deleteCart(cart_id: number): Promise<void> {
		return
	}
}

export interface ICartRepository {
	createCart(dto: CreateCartDTO): Promise<CartDTO>
	getCarts(user_id: number): Promise<CartDTO[]>
	deleteCart(cart_id: number): Promise<void>
}
