import express from 'express'
import { orderController } from '../controllers'
import { checkedUser } from '../../shared/middleware/authMiddleware'

export const orderRouter = express.Router()

orderRouter.post('/', checkedUser, orderController.createOrder)
