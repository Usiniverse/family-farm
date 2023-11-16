export interface CommentDTO {
	id: number
	user_id: number
	post_id: number
	contents: string
	created_at: Date
	updated_at: Date
}
