import { Router } from 'express'
import { userRouter } from './userRouter'
import { naverRouter } from './naverRouter'
import { postRouter } from './postRouter'
import { authRouter } from './authRouter'
import { orderRouter } from './orderRouter'
import { productRouter } from './productRouter'

const indexRouter = Router()

// 회원 정보 및 관리
indexRouter.use('/users', userRouter)

// 네이버 로그인 관리
indexRouter.use('/auth', naverRouter)

// 게시글 관리
indexRouter.use('/posts', postRouter)

// 로그인 등 권한 관리
indexRouter.use('/', authRouter)

// 주문 관리
indexRouter.use('/orders', orderRouter)

// 상품 관리
indexRouter.use('/products', productRouter)

export { indexRouter }
