import { Pagination } from '../../shared/infra/pagination'

export interface User {
	id: number
	uid: string
	email: string
	phone: string

	name: string
	nickname: string

	password: string
	password_ori_temp?: string

	created_at: Date
	updated_at: Date

	picture?: string

	provider_data?: {
		channel?: string // 가입한 채널
		kakao_id?: number // 카카오 id
	}
}

class UserPassword {
	private value: string
	constructor(value: string) {
		this.value = value
	}
}