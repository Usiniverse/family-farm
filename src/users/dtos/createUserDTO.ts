export interface CreateUserDTO {
	email: string
	password?: string
	provider_data?: {
		provider: string
	},
	nickname?: string
	snsId?: string
	picture?: string
	name?: string
	phone?: string
	birth?: string
	gender?: string
	age?: string
	birthday?: string
}
