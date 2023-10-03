import { Router } from 'express'
import { userRouter } from './userRouter'
import { naverRouter } from './naverRouter'
import { postRouter } from './postRouter'

const indexRouter = Router()

indexRouter.use('/users', userRouter)

indexRouter.use('/auth', naverRouter)

indexRouter.use('/posts', postRouter)

export { indexRouter }
