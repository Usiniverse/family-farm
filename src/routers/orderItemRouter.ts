import express from 'express'
import { checkedUser } from '../../shared/middleware/authMiddleware'
import { orderItemController } from '../controllers'

export const orderItemRouter = express.Router()

// 주문 상품 생성
orderItemRouter.post('/', checkedUser, orderItemController.createOrderItem)

// 주문 상품 조회

// 주문 상품 수정

// 주문 상품 삭제
