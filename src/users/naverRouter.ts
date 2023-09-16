import express from 'express';
import passport from 'passport'
import { userRepo } from './index'
import { Strategy as NaverStrategy, Profile as NaverProfile } from 'passport-naver-v2';
import jwt from 'jsonwebtoken'
import { naverCallback } from "./naverCallback"
import { KnexUserRepo } from './userRepository';
import { applefarmDB } from '../../shared/lib/db';
import { log } from 'console';

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

passport.serializeUser(function (user: any, done: any) {
   console.log('직렬화', user.snsId);
   done(null, user.snsId)
});

passport.deserializeUser(function (snsId: string, done: any) {
   const user = userRepo.getUserById(snsId)
   done(null, user);
});

// ---------------------패스포트 설정 ---------------------------
passport.use(
    new NaverStrategy(
       {
          clientID: process.env.NAVER_ID,
          clientSecret: process.env.NAVER_SECRET,
          callbackURL: '/auth/naver/callback',
       },
       async (accessToken: any, refreshToken: any, profile: IProfile, done: any) => {
          console.log("accessToken ::: ", accessToken);
          console.log("refreshToken ::: ", refreshToken);
         //  console.log("네이버 회원정보::: ", profile)          
          
          try {
             const exUser = await userRepo.getUser(profile.email);
             
             // 이미 가입된 네이버 프로필이면 성공
             if (exUser) {
                console.log('가입된 유저는 그대로 리턴');
                
               //  const accessToken = jwt.sign({ id: exUser.id }, 'jwt-secret-key', {
               //     algorithm: 'HS256',
               //     expiresIn: '1d'
               //  }) 

               //  const refreshToken = jwt.sign({ id: exUser.id }, 'jwt-secret-key', {
               //     algorithm: 'HS256',
               //     expiresIn: '14d'
               //  })

               //  const user = {
               //     email: profile.email,
               //     nickname: profile.name,
               //     snsId: profile.id,
               //     ProfileImages: profile.profileImage,
               //     accessToken: accessToken,
               //     refreshToken: refreshToken,
               //     provider: 'naver'
               //   };

               console.log('가입된 회원 ::: ', exUser);
               done(null, exUser);
             } else {
                console.log('가입되지 않은 유저 회원가입');
                
               //  const accessToken = jwt.sign({ id: profile.id }, 'jwt-secret-key', {
               //    algorithm: 'HS256',
               //    expiresIn: '1d'
               //   }) 
 
               //  const refreshToken = jwt.sign({ id: profile.id }, 'jwt-secret-key', {
               //    algorithm: 'HS256',
               //    expiresIn: '14d'
               //  })

                const createUser = await userRepo.createUser({
                    email: profile.email,
                    snsId: profile.id,
                    provider_data: { provider: 'naver'},
                    nickname: profile.nickname,
                    name: profile.name,
                    phone: profile.mobile,
                    birth: profile.birthyear,
                })

                done(null, createUser)
             }
          } catch (error) {
             console.error(error);
             done(error);
          }
       },
    ),
);

// 네이버 로그인
authRouter.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));

// 네이버 로그인 콜백
authRouter.get("/naver/callback", passport.authenticate('naver'), naverCallback)