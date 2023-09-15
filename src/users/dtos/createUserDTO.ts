export interface CreateUserDTO {
	email: string
	password?: string
	provider_data?: {
		provider: string
	},
	nickname?: string
	snsId?: string
	userImg?: string
	name?: string
	phone?: string
	birth?: string
}
