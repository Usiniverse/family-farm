import { PostDTO } from './posts'

export interface GetPostsDTO {
	total?: number
	limit?: number
	offset?: number
	post: PostDTO[]
}
