import bcrypt from "bcrypt";
import {CreateUserRepository} from "./createUserRepository";
import {CreateUserDTO} from "./dtos/createUserDTO";
import {User} from "./users";
import KakaoLoginService from "../../shared/Oauth/kakaoService";


export class CreateUserByKaKaoUseCase {
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
