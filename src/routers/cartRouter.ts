import express from 'express'
import { checkedUser } from '../../shared/middleware/authMiddleware'
import { cartController } from '../controllers'

export const cartRouter = express.Router()

// 장바구니 생성
cartRouter.post('/', checkedUser, cartController.createCart)

// 장바구니 조회
cartRouter.get('/', checkedUser, cartController.getCarts)
