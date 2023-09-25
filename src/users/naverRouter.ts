import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { userRepo } from './index'
dotenv.config()
const fetch = require('node-fetch')
const request = require('request-promise')

const { isLoggedIn, isNotLoggedIn, isUser } = require('../../shared/middleware/authMiddleware')

export const authRouter = express.Router()

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

// 네이버 로그인
authRouter.get('/naver', isNotLoggedIn, passport.authenticate('naver', { authType: 'reprompt' }))

// 네이버 로그인 콜백
authRouter.get('/naver/callback', isNotLoggedIn, async (req, res) => {
	// code: 클라이언트에서 다시 전달받은 코드값
	// state: 최초 클라이언트에서 발급받음. 정확한 이해 필요
	const code = req.query.code
	const state = 'c5db2fc8-f965-4789-9197-857ce81c60f6'

	const clientId = process.env.NAVER_ID as string
	const clientSecret = process.env.NAVER_SECRET as string
	const redirectURI = encodeURI('http://localhost:8000/auth/naver/callback')

	// 로그인 API를 사용해 access token을 발급받는다.
	const naver_api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&response_type=code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectURI}&code=${code}&state=${state}`
	console.log('naver_api_url::: ', naver_api_url)

	const options = {
		url: naver_api_url,
		headers: {
			'X-Naver-Client-Id': clientId,
			'X-Naver-Client-Secret': clientSecret,
		},
	}
	const result = await request.get(options)
	// string 형태로 값이 담기니 JSON 형식으로 parse를 해줘야 한다.
	const token = JSON.parse(result).access_token

	console.log('token:::', token)

	// 발급 받은 access token을 사용해 회원 정보 조회 API를 사용한다.
	const info_options = {
		url: 'https://openapi.naver.com/v1/nid/me',
		headers: { Authorization: 'Bearer ' + token },
	}

	const info_result = await request.get(info_options)
	console.log('info_result', info_result)

	// string 형태로 값이 담기니 JSON 형식으로 parse를 해줘야 한다.
	const info_result_json = JSON.parse(info_result).response

	try {
		const existUser = await userRepo.getUserBySnsId(info_result_json.id)

		const secretKey = process.env.MY_KEY as string
		// 기존회원 > 리턴, 신규회원 > 회원가입 후 리턴
		// 토큰 발급
		if (existUser) {
			const accessToken = jwt.sign(existUser, secretKey, {
				algorithm: 'HS256',
				expiresIn: '1d',
			})

			res.send({ existUser, accessToken })
		} else {
			const createUser = await userRepo.createUser({
				email: info_result_json.email,
				provider_data: {
					provider: 'naver',
				},
				nickname: info_result_json.nickname,
				sns_id: info_result_json.id,
				gender: info_result_json.gender,
				picture: info_result_json.profile_image,
				name: info_result_json.name,
				phone: info_result_json.mobile,
				birth: info_result_json.birthyear,
				age: info_result_json.age,
				birthday: info_result_json.birthday,
			})

			const accessToken = jwt.sign({ id: createUser.id }, secretKey, {
				algorithm: 'HS256',
				expiresIn: '1d',
			})

			res.send({ createUser, accessToken })
		}
	} catch (error) {
		console.log(error)
		return
	}
})
