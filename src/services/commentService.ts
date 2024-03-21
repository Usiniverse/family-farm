import { CreateCommentDTO } from '../dtos/comments/createCommentDTO'
import { postRepository } from '../repositorys'
import { ICommentRepository } from '../repositorys/commentRepository'

export class CommentService {
	private commentRepository: ICommentRepository

	constructor(commentRepository: ICommentRepository) {
		this.commentRepository = commentRepository
	}
	public async createComment(dto: CreateCommentDTO) {
		const { user_id, post_id, contents } = dto

		const post = await postRepository.getPost(post_id)

		if (!post) {
			throw new Error('게시글이 없습니다.')
		}

		return await this.commentRepository.createComment({
			user_id,
			post_id,
			contents,
		})
	}
}
