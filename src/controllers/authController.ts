import express, { Response } from 'express'
import { AuthService } from '../services/authService'
import { CustomExpressRequest } from '../../shared/lib/expressRequest'
import { authService } from '../services'
import { LoginDTO } from '../dtos/auth/LoginDTO'

export class AuthController {
	private authService: AuthService

	constructor(authService: AuthService) {
		this.authService = authService
	}

	public async login(req: CustomExpressRequest, res: Response) {
		const { email, password } = req.body

		const result = await authService.loginService({ email, password })

		return res.status(200).json(result)
	}

	public async adminLogin(req: CustomExpressRequest, res: Response) {
		const { email, password } = req.body

		const result = await authService.loginService({ email, password })

		return res.status(200).json(result)
	}
}
