import express from 'express'
import { orderController } from '../controllers'
import { checkedUser } from '../../shared/middleware/authMiddleware'

export const orderRouter = express.Router()

// 주문 생성
orderRouter.post('/', checkedUser, orderController.createOrder)

// 유저의 주문 조회
orderRouter.get('/', checkedUser, orderController.getOrderHistoryByUserId)

// 단일 주문 건 조회
orderRouter.get('/:id', checkedUser, orderController.getOrder)

// 장바구니 생성하기
// orderRouter.post('/cart', checkedUser)
