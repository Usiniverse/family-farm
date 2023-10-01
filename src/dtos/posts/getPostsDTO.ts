import { PostDTO } from './postDTO'

export interface GetPostsDTO {
	total?: number
	limit?: number
	offset?: number
	post: PostDTO[]
}
