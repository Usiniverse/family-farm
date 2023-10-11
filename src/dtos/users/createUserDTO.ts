export interface CreateUserDTO {
	email: string
	user_id?: number
	password?: string
	provider_data?: {
		provider: string
	}
	nickname?: string
	sns_id?: string
	picture?: string
	name?: string
	phone?: string
	birth?: string
	gender?: string
	is_adult?: boolean
	age?: string
	birthday?: string
}
