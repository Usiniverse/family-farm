import { Knex } from 'knex'
import { AppleFarmDBClient } from '../../shared/lib/db';
import { UserDTO } from './dtos/users';
import { CreateUserDTO } from './dtos/createUserDTO'
export class KnexUserRepo implements IUserRepository {
  private client: AppleFarmDBClient

  constructor(client: AppleFarmDBClient) {
    this.client = client
  }

  get knex(): Knex{
    return this.client.knex
  }

  async createUser(dto: CreateUserDTO): Promise<UserDTO> {
    // const query = this.knex('users').insert({ email, password }, ['*'])

    // console.log('쿼리: ', query);
    
    // return query.then((users) => users[0])
    const [createdUser] = await this.knex('users').insert(dto, ['*']);
    return createdUser;
  }

  async getUser(email: string): Promise<UserDTO> {
    const [user] = await this.knex('users').select('*').where(email)
    return user
  }

  async getUserById(id: string): Promise<UserDTO> {
    const [user] = await this.knex('users').select('*').where(id)
    return user
  }
}

interface IUserRepository {
  createUser(dto: CreateUserDTO): Promise<UserDTO>;
  getUser(email: string): Promise<UserDTO>;
  getUserById(id: string): Promise<UserDTO>
  // findById(id: string): Promise<IUser | null>;
  // update(id: string, updates: Partial<IUser>): Promise<IUser | null>;
  // delete(id: string): Promise<IUser | null>;
}
