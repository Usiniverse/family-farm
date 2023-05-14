// src/repositories/createUserRepository.ts

import {User} from "./users";
import { Knex } from 'knex'
import {AppleFarmDBClient} from "../../shared/lib/db";
import {CreateUserDTO} from "./dtos/createUserDTO";
import {UpdateUserDTO} from "./dtos/updateUserDTO";

export class UserRepository implements IUserRepository {
  private client: AppleFarmDBClient
  constructor(client: AppleFarmDBClient) {
    this.client = client
  }

  get knex(): Knex {
    return this.client.knex;
  }
  createUser(dto: CreateUserDTO): Promise<User> {
      const query = this.knex('users').insert(dto, ['*']);

      return query.then((rows) => {
          return rows[0];
      })
  }

    getUser(id: number): Promise<User> {
      return this.knex('users').where({ id }).first();

    }

    updateUser(id: string, dto: UpdateUserDTO): Promise<User> {
      const query = this.knex('users').where({ id }).update(dto, ['*']);

      return query.then((rows) => {
          return rows[0];
      })
    }

    delete(id: string): Promise<User> {
        return this.knex('users').where({ id }).delete()
    }
}


interface IUserRepository {
  createUser(dto: CreateUserDTO): Promise<User>;
  getUser(id: number): Promise<User>;
  updateUser(id: string, dto: UpdateUserDTO): Promise<User>
  delete(id: string): Promise<User>;
}
