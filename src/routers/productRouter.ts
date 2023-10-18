import express from 'express'
import { productController } from '../controllers'
import { checkedUser } from '../../shared/middleware/authMiddleware'

export const productRouter = express.Router()

productRouter.post('/', checkedUser, productController.createProduct)
