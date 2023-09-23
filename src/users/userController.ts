import { UserService } from './userService';
import express, { Request, Response } from 'express';
import { UserDTO } from './dtos/users';
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
    const { email }: GetUserDTO = req.body

    const result = await userService.getUserService({ email })
    
    res.json(result)
    return result
  }
}