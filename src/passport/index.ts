import passport from 'passport'
import { userRepo } from '../routers'
import { UserDTO } from '../dtos/users/userDTO'
const naver = require('./naver')
const local = require('./local')

module.exports = () => {
	passport.serializeUser(function (user: any, done: any) {
		console.log('직렬화', user.sns_id)
		done(null, user.sns_id)
	})

	passport.deserializeUser(function (id: number, done: any) {
		userRepo
			.getUserById(id)
			.then((user) => done(null, user))
			.catch((err) => done(err))
	})

	local()
	naver()
}
