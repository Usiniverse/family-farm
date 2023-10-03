import { UserService } from './userService'
import { PostService } from './postService'
import { userRepository, postRepository } from '../repositorys'

const userService = new UserService(userRepository)

const postService = new PostService(postRepository)

export { userService, postService }
