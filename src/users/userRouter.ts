import {userController} from "./index";
import express, { Request, Response, NextFunction } from 'express'

const { isLoggedIn, isNotLoggedIn, isUser } = require('../../shared/middleware/authMiddleware')
export const userRouter = express.Router();

// 회원가입
userRouter.post("/", userController.createUserController)

// 유효 회원 검증
userRouter.get('/me', isUser, (req: any, res: Response) => {
    const user = req.decoded.user;
    return res.status(200).json({
       code: 200,
       message: "토큰이 정상입니다.",
       data: {
          user: user,
       },
    });
})

// 회원조회
userRouter.get("/", userController.getUserController)


// 회원정보수정


// 회원탈퇴