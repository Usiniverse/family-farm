import { UserService } from './userService';
import express, { Request, Response } from 'express';
import { UserDTO } from './dtos/users';
import { applefarmDB } from "../../shared/lib/db";
import { KnexUserRepo } from "./userRepository";
import { CreateUserDTO } from './dtos/createUserDTO';
import { GetUserDTO } from './dtos/getUserDTO';
import { userRepo, userService } from './index'

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  public async createUserController(req: Request, res:Response): Promise<UserDTO> {  
    const { email, password } : CreateUserDTO = req.body as CreateUserDTO
    
    const result = await userService.createUserService({ email, password })
    
    res.json(result)
    return result
  }

  public async getUserController(req: Request, res: Response): Promise<UserDTO> {
    console.log('조회 로직 진입');
    
    const { email }: GetUserDTO = req.body

    const result = await userService.getUserService({ email })

    console.log('컨트롤러 조회 결과:::', result);
    
    res.json(result)
    return result
  }
}