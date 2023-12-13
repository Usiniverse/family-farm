import passport from 'passport'
import { Strategy as NaverStrategy, Profile as NaverProfile } from 'passport-naver-v2'
import { userRepository } from '../repositorys'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
dotenv.config()

export interface IProfile {
	id: string
	email: string
	name: string
	nickname: string
	age: string
	gender: string
	mobile: string
	birthyear: string
	birthday: string
	profileImage: string
}

module.exports = () => {
	passport.use(
		new NaverStrategy(
			{
				clientID: process.env.NAVER_ID,
				clientSecret: process.env.NAVER_SECRET,
				callbackURL: '/auth/naver/callback',
			},
			async (accessToken: any, refreshToken: any, profile: IProfile, done: any) => {
				try {
					const exUser = await userRepository.getUser(profile.email)

					const secretKey = process.env.MY_KEY as string

					const uid = uuidv4()
					// 이미 가입된 네이버 프로필이면 성공
					if (exUser) {
						const accessToken = jwt.sign({ id: exUser.id }, secretKey, {
							algorithm: 'HS256',
							expiresIn: '1d',
						})

						const refreshToken = jwt.sign({ id: exUser.id }, secretKey, {
							algorithm: 'HS256',
							expiresIn: '14d',
						})

						const user = {
							email: profile.email,
							nickname: profile.nickname,
							name: profile.name,
							sns_id: profile.id,
							ProfileImages: profile.profileImage,
							accessToken: accessToken,
							refreshToken: refreshToken,
							provider: 'naver',
						}

						done(null, user)
					} else {
						console.log('가입되지 않은 유저 회원가입')

						const accessToken = jwt.sign({ id: profile.id }, secretKey, {
							algorithm: 'HS256',
							expiresIn: '1d',
						})

						const refreshToken = jwt.sign({ id: profile.id }, secretKey, {
							algorithm: 'HS256',
							expiresIn: '14d',
						})

						const createUser = await userRepository.createUser({
							email: profile.email,
							uid,
							sns_id: profile.id,
							provider_data: { provider: 'naver' },
							nickname: profile.nickname,
							name: profile.name,
							phone: profile.mobile,
							birth: profile.birthyear,
						})

						const user = {
							createUser,
							accessToken,
							refreshToken,
						}

						done(null, user)
					}
				} catch (error) {
					console.error(error)
					done(error)
				}
			},
		),
	)
}
