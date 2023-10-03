import { UserController } from './userController'
import { PostController } from './postController'
import { userService, postService } from '../services'

const userController = new UserController(userService)
const postController = new PostController(postService, userService)

export { userController, postController }
