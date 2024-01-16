import { PostDTO } from '../dtos/posts/postDTO'
import { CreatePostDTO } from '../dtos/posts/createPostDTO'
import { UpdatePostDTO } from '../dtos/posts/updatePostDTO'
import { connection } from '../../shared/lib/db'

export class PostRepository implements ICreatePostsRepository {
	public mapRowToPostDTO(row: any): PostDTO {
		return {
			id: row.id,
			title: row.title,
			content: row.content,
			user_id: row.user_id,
			posting_password: row.posting_password,
			images: {
				img_url: row.img_url,
			},
			options: row.options,
			created_at: row.created_at,
			updated_at: row.updated_at,
		}
	}

	public async createPost(dto: CreatePostDTO): Promise<PostDTO> {
		const insertQuery = `
		  INSERT INTO posts (sns_id, user_id, title, content, images)
		  VALUES (?, ?, ?, ?, ?)
		`

		const images = JSON.stringify(dto.images)

		const values = [dto.sns_id, dto.user_id, dto.title, dto.content, images]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(insertQuery, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results.insertId)
					}
				})
			})

			const selectQuery = `SELECT * FROM posts WHERE id = ?`

			const selectResult = await new Promise((resolve, reject) => {
				connection.query(selectQuery, [result], (selectError, selectResults) => {
					if (selectError) {
						reject(selectError)
					} else {
						resolve(this.mapRowToPostDTO(selectResults[0]))
					}
				})
			})

			return selectResult as PostDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async getPost(id: number): Promise<PostDTO> {
		const query = 'SELECT * FROM posts WHERE id = ?'
		const values = [id]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return this.mapRowToPostDTO(result[0])
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async getPosts(): Promise<PostDTO[]> {
		const query = `SELECT * FROM posts`

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return result as PostDTO[]
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	public async getPostsByUserId(user_id: number): Promise<PostDTO[]> {
		const query = `SELECT * FROM posts WHERE user_id = ?`
		const values = [user_id]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return result as PostDTO[]
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	async updatePost(id: number, dto: UpdatePostDTO): Promise<PostDTO> {
		const query = `UPDATE posts SET title = ?, content = ?, images = ? WHERE id = ?`
		const images = JSON.stringify(dto.images)

		const values = [dto.title, dto.content, images, id]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			const selectQuery = `SELECT * FROM posts WHERE id = ?`
			const selectValue = [id]

			const selectResult = await new Promise((resolve, reject) => {
				connection.query(selectQuery, selectValue, (selectError, selectResults) => {
					if (selectError) {
						reject(selectError)
					} else {
						resolve(selectResults)
					}
				})
			})

			return selectResult[0] as PostDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	async deletePost(id: number): Promise<PostDTO> {
		const query = 'DELETE FROM posts WHERE id = $1 RETURNING *'
		const values = [id]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return result[0] as PostDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}
}

export interface ICreatePostsRepository {
	createPost(dto: CreatePostDTO): Promise<PostDTO>
	getPost(id: number): Promise<PostDTO>
	getPosts(): Promise<PostDTO[]>
	getPostsByUserId(id: number): Promise<PostDTO[]>
	updatePost(id: number, dto: UpdatePostDTO): Promise<PostDTO>
	deletePost(id: number): Promise<PostDTO>
}
