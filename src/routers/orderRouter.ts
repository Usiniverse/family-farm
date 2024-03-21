import express from 'express'
import { orderController } from '../controllers'
import { checkedUser } from '../../shared/middleware/authMiddleware'
import { generateOrderExcelsheet } from '../../shared/lib/excelJs'

export const orderRouter = express.Router()

// 주문 생성
orderRouter.post('/', checkedUser, orderController.createOrder)

// 최신 주문 건 조회
orderRouter.get('/', checkedUser, orderController.getLatestOrder)

// 유저의 주문 이력 조회
orderRouter.get('/list', checkedUser, orderController.getOrderHistoryByUserId)

// 엑셀시트 생성하기(checkedUser 추가 예정)
// orderRouter.post('/list', generateOrderExcelsheet)
