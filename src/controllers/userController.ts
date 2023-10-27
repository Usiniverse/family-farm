import { UserService } from '../services/userService'
import express, { Request, Response } from 'express'
import { UserDTO } from '../dtos/users/userDTO'
import { CreateUserDTO } from '../dtos/users/createUserDTO'
import { GetUserDTO } from '../dtos/users/getUserDTO'
import { userService } from '../services'
import { CustomExpressRequest } from '../../shared/lib/expressRequest'
import { UpdateUserDTO } from '../dtos/users/updateUserDTO'
import { userRepository } from '../repositorys'

export class UserController {
	private userService: UserService

	constructor(userService: UserService) {
		this.userService = userService
	}

	public async createUserController(req: CustomExpressRequest, res: Response) {
		const dto: CreateUserDTO = req.body as CreateUserDTO

		const user = await userRepository.getUser(dto.email)

		if (user.email === req.body.email) {
			return res.status(200).json({ message: '이미 가입한 회원입니다.' })
		}

		const result = await userService.createUserService(dto)

		return res.status(200).json(result)
	}

	public async getUserByEmail(req: CustomExpressRequest, res: Response) {
		const { email }: GetUserDTO = req.body

		const result = await userService.getUserByEmail({ email })

		return res.status(200).send(result)
	}

	public async getUserBySnsId(req: CustomExpressRequest, res: Response) {
		const { sns_id }: GetUserDTO = req.body as GetUserDTO

		const result = await userService.getUserBySnsId({ sns_id })

		return res.status(200).send(result)
	}

	public async updateUser(req: CustomExpressRequest, res: Response) {
		const id = req.auth.id
		// const id = req.auth.id

		const dto: UpdateUserDTO = { ...req.body, id }

		const result = await userService.updateUser(dto)

		return res.status(200).send(result)
	}

	public async deleteUser(req: CustomExpressRequest, res: Response) {
		const id = req.auth.id

		await userService.getUserById(id)

		const result = await userService.deleteUser(id)

		return res.status(200).send(result)
	}
}
