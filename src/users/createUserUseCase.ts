// src/services/createUserService.ts
import { IUser, User } from '../models/User';
import { createUserRepository } from '../repositories/createUserRepository';

export const createUserService = async (email: string, password: string): Promise<IUser> => {
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hash });
  const userRepository = createUserRepository();
  return await userRepository.create(user);
};
