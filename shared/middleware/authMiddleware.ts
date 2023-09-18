import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

//* 사용자 미들웨어를 직접 구현

exports.isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    // isAuthenticated()로 검사해 로그인이 되어있으면
    if (req.isAuthenticated()) {
       next(); // 다음 미들웨어
    } else {
       res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
   if (!req.isAuthenticated()) {
      next(); // 로그인 안되어있으면 다음 미들웨어
   } else {
      const message = encodeURIComponent('로그인한 상태입니다.');
      res.redirect(`/?error=${message}`);
   }
};

exports.isUser = (req: any, res: Response, next: NextFunction) => {
   // 인증 완료
   try {
      // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
      req.decoded = jwt.verify(req.headers.authorization as string, process.env.MY_KEY as string);
      return next();
   } catch (error) {
      // 인증 실패
      // 유효시간이 초과된 경우
      if (error.name === "TokenExpiredError") {
         return res.status(419).json({
            code: 419,
            message: "토큰이 만료되었습니다.",
         });
      }
      // 토큰의 비밀키가 일치하지 않는 경우
      if (error.name === "JsonWebTokenError") {
         return res.status(401).json({
            code: 401,
            message: "유효하지 않은 토큰입니다.",
         });
      }
   }
}