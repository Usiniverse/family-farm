import { CreateUserDTO } from './dtos/createUserDTO';
import { KnexUserRepo } from './userRepository';
import bcrypt from 'bcrypt'

export class UserService {
  private userRepo: KnexUserRepo

  constructor(userRepo: KnexUserRepo) {
    this.userRepo = userRepo
  }

  public async createUserService(dto: CreateUserDTO) {
    const userRepository = await this.userRepo.createUser(dto)

    return userRepository
  }
}

export const getUserService = async () => {

}
