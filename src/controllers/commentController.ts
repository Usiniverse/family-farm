import { CustomExpressRequest } from '../../shared/lib/expressRequest'
import express, { Response } from 'express'
import { CreateCommentDTO } from '../dtos/comments/createCommentDTO'
import { commentService } from '../services'
// import BaseController from '../../shared/lib/baseController'

export class CommentController {
	public async createComment(req: CustomExpressRequest, res: Response) {
		const user_id = req.auth.id

		const post_id = +req.params.id
		const contents = req.body.contents

		const dto: CreateCommentDTO = { user_id, post_id, contents }

		const result = await commentService.createComment(dto)

		return res.status(200).send(result)
	}
}
