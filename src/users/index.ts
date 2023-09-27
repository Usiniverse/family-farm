import { UserService } from './userService'
import { UserController } from './userController'
import { UserRepository } from './userRepository'

// 일반 로그인
const userRepo = new UserRepository()
const userService = new UserService(userRepo)
const userController = new UserController(userService)

export { userService, userController }

export { userRepo }
