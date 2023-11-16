import { UserController } from './userController'
import { PostController } from './postController'
import { userService, postService, orderService, authService } from '../services'
import { AuthController } from './authController'
import { OrderController } from './orderController'
import { userRepository } from '../repositorys'
import { ProductController } from './productController'
import { CommentController } from './commentController'

const userController = new UserController(userService)
const postController = new PostController(postService, userService)
const authController = new AuthController(authService)
const orderController = new OrderController(userRepository, orderService)
const productController = new ProductController(userRepository)
const commentController = new CommentController()

export {
	userController,
	postController,
	authController,
	orderController,
	productController,
	commentController,
}
