import { UserService } from './userService'
import { PostService } from './postService'
import {
	userRepository,
	postRepository,
	orderRepository,
	productRepository,
	commentRepository,
	cartRepository,
} from '../repositorys'
import { OrderService } from './orderService'
import { ProductService } from './productService'
import { AuthService } from './authService'
import { CommentService } from './commentService'
import { CartService } from './cartService'

const userService = new UserService(userRepository)
const postService = new PostService(postRepository)
const orderService = new OrderService(orderRepository)
const productService = new ProductService(productRepository)
const commentService = new CommentService(commentRepository)
const authService = new AuthService()
const cartService = new CartService(cartRepository, productRepository)

export {
	userService,
	postService,
	orderService,
	productService,
	authService,
	commentService,
	cartService,
}
