import { UserService } from './userService';
import express, { Request, Response } from 'express';
import { UserDTO } from './dtos/users';
import { applefarmDB } from "../../shared/lib/db";
import { KnexUserRepo } from "./userRepository";
import { CreateUserDTO } from './dtos/createUserDTO';

const userRepo = new KnexUserRepo(applefarmDB);
const createUserService = new UserService(userRepo)

export class UserController {

  constructor(userService: UserService) {
    // this.userService = userService
  }

  public async createUserController(req: Request, res:Response): Promise<UserDTO> {
    console.log('컨트롤러:::', req.body);    
    const { email, password } : CreateUserDTO = req.body as CreateUserDTO

    console.log("에러 없음");
    
    const result = await createUserService.createUserService({ email, password })
    
    console.log('리턴값 : ', result);
    
    return result
  }
}