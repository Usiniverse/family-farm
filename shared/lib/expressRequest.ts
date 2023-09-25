import express from 'express'

// from Firebase JS SDK user object.
export interface UserInfo {
	id?: number
	sns_id: string
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
	}
}

export interface CustomExpressRequest extends express.Request {
	auth?: UserInfo
}
