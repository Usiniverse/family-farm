import { UserDTO } from './dtos/users';
import { KnexUserRepo } from './userRepository';
import { CreateUserDTO } from './dtos/createUserDTO'
import { GetUserDTO } from './dtos/getUserDTO';

export class UserService {
  private userRepo: KnexUserRepo

  constructor(userRepo: KnexUserRepo) {
    this.userRepo = userRepo
  }

  public async createUserService({ email, password } : CreateUserDTO): Promise<UserDTO> {
    const userRepository = await this.userRepo.createUser({ email, password })

    console.log('유저 서비스 결과', userRepository);
    
    return userRepository
  }

  public async getUserService({ email }: GetUserDTO): Promise<UserDTO> {
    console.log('조회 서비스');
    
    const userRepository = await this.userRepo.getUser(email)

    console.log('비즈니스 로직 조회 결과:: ', userRepository);
    
    return userRepository
  }
}

// export const getUserService = async () => {

// }

// exports.UserService = UserService