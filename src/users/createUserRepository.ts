// src/repositories/createUserRepository.ts
import { IUser, User } from '../models/User';

export const createUserRepository = (): IUserRepository => {
  return {
    async create(user: IUser): Promise<IUser> {
      return await User.create(user);
    },

    async findById(id: string): Promise<IUser | null> {
      return await User.findById(id);
    },

    async update(id: string, updates: Partial<IUser>): Promise<IUser | null> {
      return await User.findByIdAndUpdate(id, updates, { new: true });
    },

    async delete(id: string): Promise<IUser | null> {
      return await User.findByIdAndDelete(id);
    },
  };
};

interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  update(id: string, updates: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<IUser | null>;
}
