import express from "express";
import {createUserController} from "./index";
import passport from "passport";
import { naverCallback } from "./naverCallback"

// const kakaoLoginRoutes = express.Router();
export const userRouter = express.Router();

// 회원가입
userRouter.post("/users", createUserController.createUserController)

// 네이버 로그인
userRouter.get('/naver', passport.authenticate('naver'));

// 네이버 로그인 콜백
userRouter.get("/naver/callback", passport.authenticate('naver'), naverCallback)

// userRouter.use('/users', userRouter)

// // Setting the naver oauth routes
// userRouter.route('/naver')
//     .get(passport.authenticate('naver', {
//         authType: 'reprompt'
//     })
// )
    

// // creates an account if no account of the new user
// userRouter.route('/naver/callback')
//     .get(passport.authenticate('naver', {
//         failureRedirect: '/'
//     }));

// module.exports = userRouter