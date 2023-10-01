import { UserService } from '../services/userService'
import { UserController } from '../controllers/userController'
import { UserRepository } from '../repositorys/userRepository'
import { PostRepository } from '../repositorys/postRepository'
import { PostController } from '../controllers/postController'
import { PostService } from '../services/postService'

// 일반 로그인
const userRepo = new UserRepository()
const userService = new UserService(userRepo)
const userController = new UserController(userService)

// import { applefarmDB } from "../../shared/lib/db"

const postRepository = new PostRepository()
const postService = new PostService(postRepository)
const postController = new PostController(postService, userService)

export { postController, postService }

export { userService, userController }

export { userRepo, postRepository }
