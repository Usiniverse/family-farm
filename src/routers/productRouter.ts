import express from 'express'
import { productController } from '../controllers'
import { checkedUser } from '../../shared/middleware/authMiddleware'

export const productRouter = express.Router()

productRouter.post('/', checkedUser, productController.createProduct)

productRouter.get('/:id', productController.getProduct)

// productRouter.get('/', checkedUser, productController.getProductsByUserId)

productRouter.get('/', productController.getProducts)

productRouter.put('/:id', checkedUser, productController.updateProduct)

productRouter.delete('/:id', checkedUser, productController.deleteProduct)
