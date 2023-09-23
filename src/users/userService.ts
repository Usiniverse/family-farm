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
    
    return userRepository
  }

  public async getUserService({ email }: GetUserDTO): Promise<UserDTO> {  
    const userRepository = await this.userRepo.getUser(email)

    return userRepository
  }
}