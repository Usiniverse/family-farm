import { UserRepository } from './userRepository'
import { PostRepository } from './postRepository'
import { OrderRepository } from './orderRepository'
import { ProductRepository } from './productRepository'
import { CommentRepository } from './commentRepository'
import { CartRepository } from './cartRepository'

const userRepository = new UserRepository()
const postRepository = new PostRepository()
const orderRepository = new OrderRepository()
const productRepository = new ProductRepository()
const commentRepository = new CommentRepository()
const cartRepository = new CartRepository()

export {
	userRepository,
	postRepository,
	orderRepository,
	productRepository,
	commentRepository,
	cartRepository,
}
