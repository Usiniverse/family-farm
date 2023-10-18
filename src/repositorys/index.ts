import { UserRepository } from './userRepository'
import { PostRepository } from './postRepository'
import { OrderRepository } from './orderRepository'
import { ProductRepository } from './productRepository'

const userRepository = new UserRepository()
const postRepository = new PostRepository()
const orderRepository = new OrderRepository()
const productRepository = new ProductRepository()

export { userRepository, postRepository, orderRepository, productRepository }
