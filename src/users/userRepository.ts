import { Knex } from 'knex'
import { AppleFarmDBClient } from '../../shared/lib/db';
import { UserDTO } from './dtos/users';
import { CreateUserDTO } from './dtos/createUserDTO'
import { updateUserDTO } from './dtos/updateUserDTO';
export class KnexUserRepo implements IUserRepository {
  private client: AppleFarmDBClient

  constructor(client: AppleFarmDBClient) {
    this.client = client
  }

  get knex(): Knex{
    return this.client.knex
  }

  async createUser(dto: CreateUserDTO): Promise<UserDTO> {
    const [createdUser] = await this.knex('users').insert(dto, ['*']);
    return createdUser;
  }

  async getUser(email: string): Promise<UserDTO> {
    console.log('DB조회');
    
    const [user] = await this.knex('users').select('*').where({ email })
    console.log([user]);
    
    return user
  }

  async getUserById(snsId: string): Promise<UserDTO> {
    const [user] = await this.knex('users').select('*').where({ snsId })
    return user
  }

  async updateUser(dto: updateUserDTO): Promise<UserDTO> {
    const [user] = await this.knex('users').update(dto, ['*'])
    return user
  }
}

interface IUserRepository {
  createUser(dto: CreateUserDTO): Promise<UserDTO>;
  getUser(email: string): Promise<UserDTO>;
  getUserById(id: string): Promise<UserDTO>;
  updateUser(dto: updateUserDTO): Promise<UserDTO>;
  // findById(id: string): Promise<IUser | null>;
  // update(id: string, updates: Partial<IUser>): Promise<IUser | null>;
  // delete(id: string): Promise<IUser | null>;
}
