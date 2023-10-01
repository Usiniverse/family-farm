import { UserService } from '../services/userService'
import express, { Request, Response } from 'express'
import { UserDTO } from '../dtos/users/userDTO'
import { CreateUserDTO } from '../dtos/users/createUserDTO'
import { GetUserDTO } from '../dtos/users/getUserDTO'
import { userRepo, userService } from '../routers/index'
import { CustomExpressRequest } from '../../shared/lib/expressRequest'

export class UserController {
	private userService: UserService

	constructor(userService: UserService) {
		this.userService = userService
	}

	public async createUserController(req: Request, res: Response): Promise<UserDTO> {
		const { email, password }: CreateUserDTO = req.body as CreateUserDTO

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

	public async getUserBySnsId(req: CustomExpressRequest, res: Response): Promise<UserDTO> {
		const { sns_id }: GetUserDTO = req.body as GetUserDTO

		const result = await userService.getUserBySnsId({ sns_id })

		res.json(result)
		return result
	}
}
