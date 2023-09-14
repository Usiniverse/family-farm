import jwt from 'jsonwebtoken'
import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport'
import * as dotenv from "dotenv"
dotenv.config()

export const naverCallback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        "naver",
        { failureRedirect: '/' },
        (err: any, user: any, info: any) => {
            console.log("네이버 로그인 시작");
            
            if (err) return next(err)
            console.log('콜백')
            const { userId, nickName, userImg } = user
            const token = jwt.sign({ userId }, process.env.MY_KEY as string)
  
            const result = {
                token,
                userId,
                nickName,
                userImg
            }
            console.log('네이버 콜백 함수 결과', result)
            res.send({ user: result })
        }
    )(req, res, next)
  }