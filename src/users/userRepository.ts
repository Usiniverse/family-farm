import { Knex } from 'knex'
import { AppleFarmDBClient } from '../../shared/lib/db';
import { UserDTO } from './dtos/users';
import { CreateUserDTO } from './dtos/createUserDTO';

export class KnexUserRepo implements IUserRepository {
  private client: AppleFarmDBClient

  constructor(client: AppleFarmDBClient) {
    this.client = client
  }

  get knex(): Knex{
    return this.client.knex
  }

  createUser(dto: CreateUserDTO): Promise<UserDTO> {
    const query = this.knex('users').insert(dto, ['*'])

    return query.then((users) => users[0])
  }
}

interface IUserRepository {
  createUser(dto: CreateUserDTO): Promise<UserDTO>;
  // findById(id: string): Promise<IUser | null>;
  // update(id: string, updates: Partial<IUser>): Promise<IUser | null>;
  // delete(id: string): Promise<IUser | null>;
}
