// import CreateUserByKakaoController from "./createUserController";
// import KakaoLoginService from "../../shared/Oauth/kakaoService";
// import {CreateUserByKaKaoUseCase} from "./createUserByKaKaoUseCase";
import { UserService } from "./userService"
import { UserController } from "./userController";
import { KnexUserRepo } from "./userRepository";
import { applefarmDB } from "../../shared/lib/db";

// 일반 로그인
const userRepo = new KnexUserRepo(applefarmDB);
const createUserService = new UserService(userRepo)
const createUserController = new UserController(createUserService)

// 카카오 로그인
// const kakaoLoginService = new KakaoLoginService();
// const createUserByKakaoUseCase = new CreateUserByKaKaoUseCase(createUserRepo);
// const createUserUseCase = new CreateUserUseCase(createUserRepo);
// const createUserByKaKaoController = new CreateUserByKakaoController(kakaoLoginService, createUserByKakaoUseCase, createUserUseCase)

export { createUserService, createUserController }

export { userRepo }