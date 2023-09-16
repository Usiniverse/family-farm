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
            console.log('1st user:::', user);
            
            if (!user) {
                return res.status(401).send("Authentication failed");
            }

            if (err) return next(err)

            try {
                const { snsId, email, name } = user
                console.log('2nd user ::: ', user);
                
                const token = jwt.sign({ snsId }, process.env.MY_KEY as string)
      
                console.log('token 확인::: ', token);
                
                const result = {
                    token,
                    snsId,
                    email,
                    name
                }
                console.log('네이버 콜백 함수 결과', result)
                res.send({ user: result })
            } catch(err) {
                console.error(err)
                return
            }
        }
    )(req, res, next)
  }