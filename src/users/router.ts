import express from "express";
import {createUserController} from "./index";

export const userRouter = express.Router();

// 회원가입
userRouter.post("/users", createUserController.createUserController)

// 회원조회


// 회원정보수정


// 회원탈퇴