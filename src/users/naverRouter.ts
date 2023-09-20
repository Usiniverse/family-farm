import express from 'express';
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()
const fetch = require('node-fetch')

const { isLoggedIn, isNotLoggedIn, isUser } = require('../../shared/middleware/authMiddleware')

export const authRouter = express.Router()

export interface IProfile {
   id: string;
   email: string;
   name: string;
   nickname: string;
   age: string;
   gender: string;
   mobile: string;
   birthyear: string;
   birthday: string;
   profileImage: string;
}

// 네이버 로그인
authRouter.get('/naver', isNotLoggedIn ,passport.authenticate('naver', { authType: 'reprompt' }));

// 네이버 로그인 콜백
authRouter.get("/naver/callback", isNotLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
   passport.authenticate(
         "naver",
         { failureRedirect: '/' },
         async (err: any, user: any, info: any) => {
            if (!user) {
               return res.status(401).send("Authentication failed");
            }

            if (err) return next(err)

            try {
               const loginError = await new Promise<void>((resolve, reject) => {
                  req.login(user, (err) => {
                     if (err) {
                        console.error(err);
                        reject(err);
                     } else {
                        resolve();
                     }
                  });
               });

               console.log('user:::', user);
            
               const { snsId, email, name, accessToken } = user;
               const result = {
                  accessToken,
                  snsId,
                  email,
                  name
               }

               res.send({ result })

               // if (result.accessToken) {
               //    const header = "Bearer " + accessToken;
               //    console.log('token :::', header);
                  
               //    const userDataRaw = await fetch("https://openapi.naver.com/v1/nid/me", {
               //       method: "GET",
               //       headers: {
               //          Authorization: header
               //       }
               //    });
                  
               //    const userData = await userDataRaw.json()

               //    console.log('네이버 콜백 함수 결과', userData)
               //    res.send({ userData });
               // } else {
               //    console.log();
                  
               //    res.send({ result })
               // }
            } catch (err) {
               console.error(err);
               return next(err);
            }
         }
   )(req, res, next)
});

// 네이버 회원 프로필 조회 API

// 유효 회원 검증
authRouter.get('/users/me', isUser, (req: any, res: Response) => {
   const nickname = req.decoded.nickname;
   const profile = req.decoded.profile;
   return res.status(200).json({
      code: 200,
      message: "토큰이 정상입니다.",
      data: {
         nickname: nickname,
         profile: profile,
      },
   });
})