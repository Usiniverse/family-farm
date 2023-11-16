import { RowDataPacket } from 'mysql2'
import { CommentDTO } from '../dtos/comments/commentDTO'
import { CreateCommentDTO } from '../dtos/comments/createCommentDTO'
import { connection } from '../../shared/lib/db'

export class CommentRepository implements ICommentRepository {
	public async createComment(dto: CreateCommentDTO): Promise<CommentDTO> {
		const query = `INSERT INTO comments (user_id, post_id, contents) VALUES (?, ?, ?)`
		const values = [dto.user_id, dto.post_id, dto.contents]

		try {
			const result = await new Promise<RowDataPacket>((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			const selectQuery = `SELECT * FROM comments WHERE id = ?`

			const selectResult = await new Promise((resolve, reject) => {
				connection.query(selectQuery, [result.insertId], (selectError, selectResults) => {
					if (selectError) {
						reject(selectError)
					} else {
						resolve(selectResults)
					}
				})
			})

			return selectResult[0] as CommentDTO
		} catch (e) {
			console.error(e)
			throw e
		}
	}
}

export interface ICommentRepository {
	createComment(dto: CreateCommentDTO): Promise<CommentDTO>
}
