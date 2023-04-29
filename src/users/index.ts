import CreateUserByKakaoController from "./createUserController";
import KakaoLoginService from "../../shared/Oauth/kakaoService";
import {CreateUserByKaKaoUseCase} from "./createUserByKaKaoUseCase";
import {CreateUserRepository} from "./createUserRepository";
import {applefarmDB} from "../../shared/lib/db";

const createUserRepo = new CreateUserRepository(applefarmDB);
const kakaoLoginService = new KakaoLoginService();
const createUserByKakaoUseCase = new CreateUserByKaKaoUseCase(createUserRepo);
const createUserByKaKaoController = new CreateUserByKakaoController(kakaoLoginService, createUserByKakaoUseCase)

export { createUserByKaKaoController, kakaoLoginService }