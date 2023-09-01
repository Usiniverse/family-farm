import express from "express";
import {createUserController} from "./index";

// const kakaoLoginRoutes = express.Router();
export const userRouter = express.Router();

userRouter.post("/", createUserController.createUserController)
// userRouter.use('/users', userRouter)

// kakaoLoginRoutes.get("/auth/kakao", (req, res) => {
//     // 카카오 로그인 페이지로 리다이렉트
//     res.redirect(kakaoLoginService.getLoginPageURL());
// });

// // 카카오 로그인 콜백 라우터
// kakaoLoginRoutes.get("/auth/kakao/callback", async (req, res) => {
//     try {
//         const code = req.query.code as string;
//         await createUserByKaKaoController.createUserByKakao(code);
//         res.send("카카오 로그인 성공");
//     } catch (error) {
//         console.error("카카오 로그인 실패", error);
//         res.status(500).send("카카오 회원가입에 실패했습니다.");
//     }
// });

// userRouter.post("/users", createUserController.createUserController)

// module.exports = userRouter