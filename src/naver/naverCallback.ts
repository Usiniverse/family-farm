import jwt from 'jsonwebtoken'
import { userRepository } from '../repositorys/index'
import { v4 as uuidv4 } from 'uuid'

const request = require('request-promise')

/**
 * 1. 로그인 창에서 id, password 입력 후 로그인
 * 2. 정보제공동의 창
 * 3. 생성된 state, code값 추출 후 백으로(/auth/naver/callback)
 * 4. naver_api_url < 여기다가 애플리케이션 아이디, 시크릿키
 */
export const naverCallback = async (req, res) => {
	// code: 클라이언트에서 다시 전달받은 코드값
	// state: 각 클라이언트마다 state가 다름
	const code = req.query.code
	const state = req.query.state
	console.log('프론트에서 받은 code :::', code)
	console.log('프론트에서 받은 code :::', state)

	// const state = 'c5db2fc8-f965-4789-9197-857ce81c60f6'

	const clientId = process.env.NAVER_ID as string
	const clientSecret = process.env.NAVER_SECRET as string
	// const redirectURI = encodeURI('http://localhost:8000/auth/naver/callback')
	const redirectURI = encodeURI('https://familyfarm.co.kr/auth/naver/callback')

	// 로그인 API를 사용해 access token을 발급받는다.
	const naver_api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&response_type=code
		&client_id=${clientId}
		&client_secret=${clientSecret}
		&redirect_uri=${redirectURI}
		&code=${code}
		&state=${state}
	`

	console.log('얘가 없다는데요???', clientId, clientSecret)

	const options = {
		url: naver_api_url,
		headers: {
			'X-Naver-Client-Id': clientId,
			'X-Naver-Client-Secret': clientSecret,
		},
	}
	const result = await request.get(options)
	console.log('result :::', result)

	// string 형태로 값이 담기니 JSON 형식으로 parse를 해줘야 한다.
	const token = JSON.parse(result).access_token
	console.log('naver token::: ', token)

	// 발급 받은 access token을 사용해 회원 정보 조회 API를 사용한다.
	const info_options = {
		url: 'https://openapi.naver.com/v1/nid/me',
		headers: { Authorization: 'Bearer ' + token },
	}

	const info_result = await request.get(info_options)

	const info_result_json = JSON.parse(info_result).response
	// console.log(info_result_json)

	try {
		const existUser = await userRepository.getUserBySnsId(info_result_json.id)

		const secretKey = process.env.MY_KEY as string

		const uid = uuidv4()
		// 기존회원 > 리턴, 신규회원 > 회원가입 후 리턴
		// 토큰 발급
		if (existUser) {
			const accessToken = jwt.sign({ id: existUser.id }, secretKey, {
				algorithm: 'HS256',
				expiresIn: '1d',
			})

			res.send({ existUser, accessToken })
		} else {
			const user = await userRepository.createUser({
				email: info_result_json.email,
				uid,
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

			// const getUser = await userRepository.getUserBySnsId(info_result_json.id)

			const accessToken = jwt.sign({ id: user.id }, secretKey, {
				algorithm: 'HS256',
				expiresIn: '1d',
			})

			res.send({ user, accessToken })
		}
	} catch (error) {
		console.log('네이버 로그인 실패')
		return
	}
}
