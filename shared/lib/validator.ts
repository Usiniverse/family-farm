import Joi from 'joi'

const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{8,}$/
// .regex(RegExp(pattern))
export const registerSchema = Joi.object().keys({
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.required()
		.messages({
			'string.pattern.base': '이메일 형식이 바르지 않습니다.',
			'any.required': 'NO email INPUT',
		}),
	password: Joi.string() // 8자 이상, 영어+숫자+특수문자
		.regex(RegExp(pattern))
		.min(8)
		.required()
		.messages({
			'string.pattern.base': '비밀번호는 8자 이상 문자+특수문자 조합으로 되어야합니다.',
			'string.min': 'PW BELOW STRING LENGTH 8',
			'string.required': 'NO PW INPUT',
		}),
	passwordConfirm: Joi.string() // 8자 이상, 영어+숫자+특수문자
		.regex(RegExp(pattern))
		.min(8)
		.messages({
			'string.pattern.base': '비밀번호는 8자 이상 문자+특수문자 조합으로 되어야합니다.',
			'string.min': 'PW BELOW STRING LENGTH 8',
			'string.required': 'NO PW INPUT',
		}),
	nickname: Joi.string().pattern(new RegExp('^[a-zA-Z0-9가-힣]*$')).min(2).messages({
		'string.pattern.base':
			'닉네임은 영어/한글 + 숫자 조합이거나 영어 또는 한글만 입력할 수 있습니다.',
		'string.min': '닉네임은 2자 이상이어야 합니다.',
		'string.required': '닉네임을 입력하지 않았습니다.',
	}), // 형식: 2자 이상, 영/한글 조합 + 숫자 / 유효성 검사 시 부적절한 언어 체크
})

// email 중복확인 검증
export const alreadyEmailSchema = Joi.object().keys({
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.required()
		.messages({
			'string.pattern.base': '이메일 형식이 바르지 않습니다.',
			'any.required': '이메일이 입력되지 않았습니다.',
		}),
})

// nickname 중복확인 검증
export const alreadyNicknameSchema = Joi.object().keys({
	nickname: Joi.string().pattern(new RegExp('^[a-zA-Z0-9가-힇]{2,15}$')).min(2).messages({
		'string.pattern.base': '닉네임은 영어/한글 + 숫자 조합이어야 합니다.',
		'string.min': 'PW BELOW STRING LENGTH 2',
		'string.required': 'NO NICKNAME INPUT',
	}),
})
