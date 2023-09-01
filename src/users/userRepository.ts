import { Knex } from 'knex'
import { AppleFarmDBClient } from '../../shared/lib/db';
import { UserDTO } from './dtos/users';
import { log } from 'console';

export class KnexUserRepo implements IUserRepository {
  private client: AppleFarmDBClient

  constructor(client: AppleFarmDBClient) {
    this.client = client
  }

  get knex(): Knex{
    return this.client.knex
  }

  async createUser(email: string, password: string): Promise<UserDTO> {
    // const query = this.knex('users').insert({ email, password }, ['*'])

    // console.log('쿼리: ', query);
    
    // return query.then((users) => users[0])
    const [createdUser] = await this.knex('users').insert({ email, password }, ['*']);
    return createdUser;
  }
}

interface IUserRepository {
  createUser(email: string, password: string): Promise<UserDTO>;
  // findById(id: string): Promise<IUser | null>;
  // update(id: string, updates: Partial<IUser>): Promise<IUser | null>;
  // delete(id: string): Promise<IUser | null>;
}
