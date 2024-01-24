import { UserController } from './userController'
import { PostController } from './postController'
import { userService, postService, orderService, authService, cartService } from '../services'
import { AuthController } from './authController'
import { OrderController } from './orderController'
import { userRepository } from '../repositorys'
import { ProductController } from './productController'
import { CommentController } from './commentController'
import { CartController } from './cartController'

const userController = new UserController(userService)
const postController = new PostController(postService, userService)
const authController = new AuthController(authService)
const orderController = new OrderController(userRepository, orderService)
const productController = new ProductController(userRepository)
const commentController = new CommentController()
const cartController = new CartController(cartService)

export {
	userController,
	postController,
	authController,
	orderController,
	productController,
	commentController,
	cartController,
}
