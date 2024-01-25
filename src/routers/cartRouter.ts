import express from 'express'
import { checkedUser } from '../../shared/middleware/authMiddleware'
import { cartController } from '../controllers'

export const cartRouter = express.Router()

// 장바구니 생성
cartRouter.post('/', checkedUser, cartController.createCart)

// 장바구니 조회
cartRouter.get('/', checkedUser, cartController.getCarts)

// 장바구니 수정
cartRouter.patch('/:cart_id', checkedUser, cartController.updateCart)

// 장바구니 삭제
cartRouter.delete('/:cart_id', checkedUser, cartController.deleteCart)
