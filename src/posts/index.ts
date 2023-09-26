// import { applefarmDB } from "../../shared/lib/db";
import { PostRepository } from './postRepository'
import { PostController } from './postController'
import { PostService } from './postService'
import { userService } from '../users/index'

const postRepository = new PostRepository()
const postService = new PostService(postRepository)
const postController = new PostController(postService, userService)

export { postController, postService }
