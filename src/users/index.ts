import { UserService } from "./userService"
import { UserController } from "./userController";
import { KnexUserRepo } from "./userRepository";
import { applefarmDB } from "../../shared/lib/db";

// 일반 로그인
const userRepo = new KnexUserRepo(applefarmDB);
const userService = new UserService(userRepo)
const userController = new UserController(userService)

export { userService, userController }

export { userRepo }