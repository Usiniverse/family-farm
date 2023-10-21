require('dotenv').config()
const { Strategy: LocalStrategy } = require('passport-local')
import passport from 'passport'
import bcrypt from 'bcrypt'
import { userRepository } from '../repositorys'
import jwt from 'jsonwebtoken'

module.exports = () => {
	passport.use(
		new LocalStrategy(
			{
				//검사가 이루어지며, 아래 email과 password가 있는 자리에는 body에 해당되는 것을 넣어주면 된다.
				usernameField: 'email', //req.body.email
				passwordField: 'password', // req.body.password
			},
			async (email: string, password: string, done: any) => {
				try {
					const exUser = await userRepository.getUser(email)

					if (exUser) {
						const result = await bcrypt.compare(password, exUser.password!)

						if (result) {
							const accessToken = jwt.sign({ id: exUser.id }, 'jwt-secret-key', {
								algorithm: 'HS256',
								expiresIn: '20s',
							})

							const refreshToken = jwt.sign({ id: exUser.id }, 'jwt-secret-key', {
								algorithm: 'HS256',
								expiresIn: '14d',
							})

							const user = {
								email: exUser.email,
								nickname: exUser.nickname,
								accessToken,
								refreshToken,
							}

							done(null, user)
						} else {
							done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
						}
					} else {
						done(null, false, { message: '존재하지 않는 유저입니다.' })
					}
				} catch (err) {
					console.error('에러메세지:::', err)
					done(err)
				}
			},
		),
	)
}
