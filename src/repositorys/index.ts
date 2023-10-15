import { UserRepository } from './userRepository'
import { PostRepository } from './postRepository'
import { OrderRepository } from './orderRepository'

const userRepository = new UserRepository()
const postRepository = new PostRepository()
const orderRepository = new OrderRepository()

export { userRepository, postRepository, orderRepository }
