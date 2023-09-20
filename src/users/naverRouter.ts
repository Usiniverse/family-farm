import express from 'express';
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()
const fetch = require('node-fetch')
const request = require('request-promise')

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
// authRouter.get("/naver/callback", isNotLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
//    passport.authenticate(
//          "naver",
//          { failureRedirect: '/' },
//          async (err: any, user: any, info: any) => {
//             if (!user) {
//                return res.status(401).send("Authentication failed");
//             }

//             if (err) return next(err)

//             try {
//                const loginError = await new Promise<void>((resolve, reject) => {
//                   req.login(user, (err) => {
//                      if (err) {
//                         console.error(err);
//                         reject(err);
//                      } else {
//                         resolve();
//                      }
//                   });
//                });

//                console.log('user:::', user);
            
//                const { snsId, email, name, accessToken } = user;
//                const result = {
//                   accessToken,
//                   snsId,
//                   email,
//                   name
//                }

//                res.send({ result })

//                // if (result.accessToken) {
//                //    const header = "Bearer " + accessToken;
//                //    console.log('token :::', header);
                  
//                //    const userDataRaw = await fetch("https://openapi.naver.com/v1/nid/me", {
//                //       method: "GET",
//                //       headers: {
//                //          Authorization: header
//                //       }
//                //    });
                  
//                //    const userData = await userDataRaw.json()

//                //    console.log('네이버 콜백 함수 결과', userData)
//                //    res.send({ userData });
//                // } else {
//                //    console.log();
                  
//                //    res.send({ result })
//                // }
//             } catch (err) {
//                console.error(err);
//                return next(err);
//             }
//          }
//    )(req, res, next)
// });

authRouter.get("/naver/callback", isNotLoggedIn, async (req, res) => {
   // 토큰을 발급받으려면 query string으로 넘겨야 할 정보들이다.
   const code = req.query.code
   const state = 'c5db2fc8-f965-4789-9197-857ce81c60f6';

   const clientId = process.env.NAVER_ID as string
   const clientSecret = process.env.NAVER_SECRET as string
   const redirectURI = encodeURI('http://localhost:8000/auth/naver/callback')

    // 로그인 API를 사용해 access token을 발급받는다.
   const naver_api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&response_type=code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;
   console.log('naver_api_url::: ', naver_api_url);
   
   const options = {
       url: naver_api_url,
       headers: {
         'X-Naver-Client-Id': clientId, 
         'X-Naver-Client-Secret': clientSecret
       }
   }
   const result = await request.get(options);
    // string 형태로 값이 담기니 JSON 형식으로 parse를 해줘야 한다.
   const token = JSON.parse(result).access_token;

   console.log('token:::', token);
   
 
   // 발급 받은 access token을 사용해 회원 정보 조회 API를 사용한다.
   const info_options = {
       url: 'https://openapi.naver.com/v1/nid/me',
       headers: {'Authorization': 'Bearer ' + token}
   };

   const info_result = await request.get(info_options);
   console.log('info_result', info_result);
   
    // string 형태로 값이 담기니 JSON 형식으로 parse를 해줘야 한다.
   const info_result_json = JSON.parse(info_result).response;

   res.send({ info_result_json })
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