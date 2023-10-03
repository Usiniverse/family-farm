import { UserRepository } from './userRepository'
import { PostRepository } from './postRepository'

const userRepository = new UserRepository()
const postRepository = new PostRepository()

export { userRepository, postRepository }
