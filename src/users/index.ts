import { UserService } from "./userService"
import { UserController } from "./userController";
import { KnexUserRepo } from "./userRepository";
import { applefarmDB } from "../../shared/lib/db";

// 일반 로그인
const userRepo = new KnexUserRepo(applefarmDB);
const createUserService = new UserService(userRepo)
const createUserController = new UserController(createUserService)

export { createUserService, createUserController }

export { userRepo }