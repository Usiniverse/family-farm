import { UserService } from './userService'
import { PostService } from './postService'
import { userRepository, postRepository, orderRepository, productRepository } from '../repositorys'
import { OrderService } from './orderService'
import { ProductService } from './productService'

const userService = new UserService(userRepository)
const postService = new PostService(postRepository)
const orderService = new OrderService(orderRepository)
const productService = new ProductService(productRepository)

export { userService, postService, orderService, productService }
