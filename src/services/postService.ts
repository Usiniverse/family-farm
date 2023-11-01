import { ICreatePostsRepository } from '../repositorys/postRepository'
import { PostDTO } from '../dtos/posts/postDTO'
import { CreatePostDTO } from '../dtos/posts/createPostDTO'
import { GetPostDTO } from '../dtos/posts/getPostDTO'
import { UpdatePostDTO } from '../dtos/posts/updatePostDTO'
import { DeletePostDTO } from '../dtos/posts/deletePostDTO'

export class PostService {
	private postsRepository: ICreatePostsRepository

	constructor(postsRepository: ICreatePostsRepository) {
		this.postsRepository = postsRepository
	}

	public async createPost(dto: CreatePostDTO): Promise<PostDTO> {
		const { title, content, sns_id, user_id, images } = dto

		if (!title) {
			throw new Error('제목을 입력해주세요')
		}

		return await this.postsRepository.createPost({
			title,
			content,
			images,
			sns_id,
			user_id,
		})
	}

	public async getPost(id: number): Promise<PostDTO> {
		return await this.postsRepository.getPost(id)
	}

	public async getPosts(): Promise<PostDTO[]> {
		return await this.postsRepository.getPosts()
	}

	public async getPostsByUserId(id: number): Promise<PostDTO[]> {
		return await this.postsRepository.getPostsByUserId(id)
	}

	public async updatePost(dto: UpdatePostDTO): Promise<PostDTO> {
		return await this.postsRepository.updatePost(dto.id, {
			...dto,
		})
	}

	public async deletePost(dto: DeletePostDTO): Promise<PostDTO> {
		return await this.postsRepository.deletePost(dto.id)
	}
}
