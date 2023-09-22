export interface UserDTO {
    id?: number
	snsId?: string
	email: string
	name?: string
	nickname?: string
	password?: string
	phone?: string
	picture?: string
	birth?: string
	is_adult?: boolean
	options?: object
	provider_data?: {
		provider: string
	},
	email_verified_at?: Date
	phone_verified_at?: Date
	created_at?: Date
	updated_at?: Date
	blocked_at?: Date
	deleted_at?: Date
}