import { UserController } from './userController'
import { PostController } from './postController'
import { userService, postService, orderService, productService } from '../services'
import { AuthController } from './authController'
import { OrderController } from './orderController'
import { userRepository } from '../repositorys'
import { ProductController } from './productController'

const userController = new UserController(userService)
const postController = new PostController(postService, userService)
const authController = new AuthController()
const orderController = new OrderController(userRepository, orderService)
const productController = new ProductController(userRepository)

export { userController, postController, authController, orderController, productController }
