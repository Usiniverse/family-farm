import { UserService } from './userService'
import { PostService } from './postService'
import { userRepository, postRepository, orderRepository } from '../repositorys'
import { OrderService } from './orderService'

const userService = new UserService(userRepository)
const postService = new PostService(postRepository)
const orderService = new OrderService(orderRepository)

export { userService, postService, orderService }
