import { Router } from 'express'
import { userRouter } from './userRouter'
import { naverRouter } from './naverRouter'
import { postRouter } from './postRouter'
import { authRouter } from './authRouter'

const indexRouter = Router()

// 회원 정보 및 관리
indexRouter.use('/users', userRouter)

// 네이버 로그인 관리
indexRouter.use('/naver', naverRouter)

// 게시글 관리
indexRouter.use('/posts', postRouter)

// 로그인 등 권한 관리
indexRouter.use('/auth', authRouter)

export { indexRouter }
