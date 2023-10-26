// import express from 'express'
// import { AuthService } from '../services/authService'
// import { CustomExpressRequest } from '../../shared/lib/expressRequest'
// import { authService } from '../services'

// export class AuthController {
// 	private authService: AuthService

// 	constructor(authService: AuthService) {
// 		this.authService = authService
// 	}

// 	public async login(req: CustomExpressRequest, res: express.Response) {
// 		const { email, password } = req.body

// 		const result = await authService.loginService({ email, password })

// 		return res.status(200).json(result)
// 	}
// }
