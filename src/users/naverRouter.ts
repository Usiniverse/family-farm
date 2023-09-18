import express from 'express';
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import {createUserController} from "./index";
import dotenv from 'dotenv'
dotenv.config()

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
authRouter.get("/naver/callback", isNotLoggedIn, (req: Request, res: Response, next: NextFunction) => {
   passport.authenticate(
       "naver",
       { failureRedirect: '/' },
       (err: any, user: any, info: any) => {           
           if (!user) {
               return res.status(401).send("Authentication failed");
           }

           if (err) return next(err)

         return req.login(user, loginError => {
            //? loginError => 미들웨어는 passport/index.js의 passport.deserializeUser((id, done) => 가 done()이 되면 실행하게 된다.
            // 만일 done(err) 가 됬다면,
            if (loginError) {
               console.error(loginError);
               return next(loginError);
            }
            console.log('user:::', user);
            

            try {
               const { snsId, email, name } = user               
               const token = jwt.sign({ snsId }, process.env.MY_KEY as string)
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
         });
       }
   )(req, res, next)
})


// 회원가입
authRouter.post("/users", createUserController.createUserController)

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