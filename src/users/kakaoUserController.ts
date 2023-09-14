import {CreateUserDTO} from "./dtos/createUserDTO";
import KakaoLoginService from "../../shared/Oauth/kakaoService";


export class KaKaoUserController {
  private createUserRepo: CreateUserRepository

  constructor(createUserRepo: CreateUserRepository) {
    this.createUserRepo = createUserRepo;
  }

  async execute(dto: CreateUserDTO): Promise<User> {
    const kakaoLoginService = new KakaoLoginService();
    const userInfo = await kakaoLoginService.handleKakaoLogin("authorization_code");

    console.log(userInfo);

    return await this.createUserRepo.createUser(dto)
  }
}
