import { PostDTO } from './dtos/posts'
import { CreatePostDTO } from './dtos/createPostDTO'
import { UpdatePostDTO } from './dtos/updatePostDTO'
import { client } from '../../shared/lib/db'

export class PostRepository implements ICreatePostsRepository {
	public async createPost(dto: CreatePostDTO): Promise<PostDTO> {
		const query = `INSERT INTO posts (sns_id, title, content, posting_password, images) VALUES ($1, $2, $3, $4, $5) RETURNING *`
		const values = [dto.sns_id, dto.title, dto.content, dto.posting_password, dto.images]

		try {
			const result = await client.query(query, values)
			console.log('게시글 DB생성 완료 :::', result.rows)

			client.end()

			return result.rows[0] as PostDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async getPost(id: number): Promise<PostDTO> {
		const query = 'SELECT * FROM posts WHERE id = $1'
		const values = [id]

		try {
			const result = await client.query(query, values)
			return result.rows[0] as PostDTO
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async getPostsBySnsId(id: string): Promise<PostDTO> {
		const query = 'SELECT * FROM posts WHERE sns_id = $1'
		const values = [id]

		try {
			const result = await client.query(query, values)
			return result.rows[0] as PostDTO
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async getPosts(): Promise<PostDTO[]> {
		const query = `SELECT * FROM posts`

		try {
			const result = await client.query(query)
			return result.rows as PostDTO[]
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public async getPostsByUserId(id: number): Promise<PostDTO> {
		const query = `SELECT * FROM posts WHERE user_id = $1`
		const values = [id]

		try {
			const result = await client.query(query, values)
			return result.rows[0]
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async updatePost(id: number, dto: UpdatePostDTO): Promise<PostDTO> {
		const query = `SELECT * FROM posts WHERE id = $1`
		const values = [id, dto.user_id, dto.title, dto.content, dto.images]

		try {
			const result = await client.query(query, values)
			return result.rows[0]
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async deletePost(id: number): Promise<PostDTO> {
		const query = 'DELETE FROM posts WHERE id = $1 RETURNING *'
		const values = [id]

		try {
			const result = await client.query(query, values)
			console.log(result.rows)
			client.end()
			// Check if the deletion was successful
			if (result.rowCount === 1) {
				console.log('Deletion successful')
			} else {
				console.log('Deletion failed')
			}

			return result.rows[0]
		} catch (error) {
			console.error(error.stack)
			throw error
		}
	}
}

export interface ICreatePostsRepository {
	createPost(dto: CreatePostDTO): Promise<PostDTO>
	getPost(id: number): Promise<PostDTO>
	getPosts(): Promise<PostDTO[]>
	getPostsByUserId(id: number): Promise<PostDTO>
	getPostsBySnsId(id: string): Promise<PostDTO>
	updatePost(id: number, dto: UpdatePostDTO): Promise<PostDTO>
	deletePost(id: number): Promise<PostDTO>
}
