export interface CreateUserDTO {
	email: string
	uid: string
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
	is_adult?: string
	age?: string
	birthday?: string
	address?: string
}
