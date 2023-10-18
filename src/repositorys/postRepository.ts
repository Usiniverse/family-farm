import { PostDTO } from '../dtos/posts/postDTO'
import { CreatePostDTO } from '../dtos/posts/createPostDTO'
import { UpdatePostDTO } from '../dtos/posts/updatePostDTO'
import { connection } from '../../shared/lib/db'
import { RowDataPacket } from 'mysql2/promise'

export class PostRepository implements ICreatePostsRepository {
	public async createPost(dto: CreatePostDTO): Promise<PostDTO> {
		const insertQuery = `
		  INSERT INTO posts (sns_id, title, content, posting_password, images)
		  VALUES (?, ?, ?, ?, ?)
		`

		const images = JSON.stringify(dto.images)

		const values = [dto.sns_id, dto.title, dto.content, dto.posting_password, images]

		try {
			const insertResult = await new Promise<RowDataPacket>((resolve, reject) => {
				connection.query(insertQuery, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			const selectQuery = `SELECT * FROM posts WHERE id = ?`

			const selectResult = await new Promise((resolve, reject) => {
				connection.query(
					selectQuery,
					[insertResult.insertId],
					(selectError, selectResults) => {
						if (selectError) {
							reject(selectError)
						} else {
							resolve(selectResults)
						}
					},
				)
			})

			console.log('생성 후 조회 ::: ', selectResult[0])

			return selectResult[0] as PostDTO
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

			return result[0] as PostDTO
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
		const query = `UPDATE posts SET user_id = $2, title = $3, content = $4, images = $5 WHERE id = $1 RETURNING *`
		const values = [id, dto.user_id, dto.title, dto.content, dto.images]

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
