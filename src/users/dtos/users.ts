export interface UserDTO {
    id?: number
	email: string
	password: string
	birth?: string
	phone?: string
	name?: string
	nickname?: string
	provider_data?: {
		channel?: string
		kakao_id?: number
	}
	uid?: string
	role?: string
	phone_verified_at?: Date
	is_adult?: boolean
	picture?: string
	email_verified_at?: Date
}