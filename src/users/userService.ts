import { log } from 'console';
import { UserDTO } from './dtos/users';
import { KnexUserRepo } from './userRepository';

export class UserService {
  private userRepo: KnexUserRepo

  constructor(userRepo: KnexUserRepo) {
    this.userRepo = userRepo
  }

  public async createUserService(email: string, password: string): Promise<UserDTO> {
    console.log("비즈니스 로직 진입", email);
    const userRepository = await this.userRepo.createUser(email, password)

    console.log('유저 서비스 결과', userRepository);
    
    return userRepository
  }
}

// export const getUserService = async () => {

// }

// exports.UserService = UserService