import express from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import { naverCallback } from '../naver/naverCallback'
dotenv.config()

const { isLoggedIn, isNotLoggedIn, isUser } = require('../../shared/middleware/authMiddleware')

export const authRouter = express.Router()

// 네이버 로그인
authRouter.get('/naver', isNotLoggedIn, passport.authenticate('naver', { authType: 'reprompt' }))

// 네이버 로그인 콜백
authRouter.get('/naver/callback', isNotLoggedIn, naverCallback)
