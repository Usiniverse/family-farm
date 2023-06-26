import CreateUserByKakaoController from "./createUserController";
import KakaoLoginService from "../../shared/Oauth/kakaoService";
import {CreateUserByKaKaoUseCase} from "./createUserByKaKaoUseCase";
import {UserRepository} from "./createUserRepository";
import {applefarmDB} from "../../shared/lib/db";
import {CreateUserUseCase} from "./createUserUseCase";

const createUserRepo = new UserRepository(applefarmDB);
const kakaoLoginService = new KakaoLoginService();
const createUserByKakaoUseCase = new CreateUserByKaKaoUseCase(createUserRepo);
const createUserUseCase = new CreateUserUseCase(createUserRepo);
const createUserByKaKaoController = new CreateUserByKakaoController(kakaoLoginService, createUserByKakaoUseCase, createUserUseCase)

export { createUserByKaKaoController, kakaoLoginService }