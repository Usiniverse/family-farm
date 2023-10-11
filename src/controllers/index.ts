import { UserController } from './userController'
import { PostController } from './postController'
import { userService, postService } from '../services'
import { AuthController } from './authController'

const userController = new UserController(userService)
const postController = new PostController(postService, userService)
const authController = new AuthController()

export { userController, postController, authController }
