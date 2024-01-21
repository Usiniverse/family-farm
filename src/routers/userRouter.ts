import { authController, userController } from '../controllers'
import express, { Request, Response, NextFunction } from 'express'
import { checkedUser } from '../../shared/middleware/authMiddleware'

export const userRouter = express.Router()

/**
 * @swagger
 *
 * /users:
 *  post:
 *    summary: "회원가입"
 *    description: "POST 방식으로 유저를 등록한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 등록)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: "이메일, 유저 아이디로 사용"
 *              name:
 *                type: string
 *                description: "유저 이름"
 *              password:
 *                type: string
 *                description: "비밀번호"
 *              nickname:
 *                type: string
 *                description: "닉네임"
 *              sns_id:
 *                type: string
 *                description: "네이버에서 사용하는 유저 고유 아이디. 네이버 회원가입으로 가입할 경우 생성된다."
 *              phone:
 *                type: string
 *                description: "연락처. 배송을 위해 꼭 필요함"
 *              birth:
 *                type: string
 *                description: "생년월일"
 *              gender:
 *                type: string
 *                description: "성별"
 *              age:
 *                type: string
 *                description: "나이"
 *              address:
 *                type: string
 *                description: "주소. 배송을 위해 꼭 필요"
 *              picture:
 *                type: string
 *                description: "네이버에서 받아오게 될 유저 프로필 사진"
 */
userRouter.post('/', userController.createUserController)

/**
 * @swagger
 * paths:
 *  /users/email:
 *    get:
 *      summary: "회원 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Users]
 *      requestBody:
 *        description: 이메일(유저 아이디)
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: 예) applefarm@gmail.com
 *      responses:
 *        "200":
 *          description: 회원 가입 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    user:
 *                      type: object
 *                      example:
 *                          {
 *                              "id": 20,
 *                              "uid": "",
 *                              "sns_id": null,
 *                              "email": "k007ys1@gmail.com",
 *                              "name": "강유신",
 *                              "birth": "1991",
 *                              "address": null,
 *                              "birthday": "0924",
 *                              "age": "33",
 *                              "nickname": "유띠니",
 *                              "gender": "남성",
 *                              "password": "",
 *                              "phone": "01033374172",
 *                              "picture": null,
 *                              "is_adult": "1",
 *                              "options": null,
 *                              "provider_data": null,
 *                              "email_verified_at": null,
 *                              "phone_verified_at": null,
 *                              "created_at": "2023-10-25T21:16:54.000Z",
 *                              "updated_at": "2023-10-25T21:16:54.000Z",
 *                              "last_sign_in_at": "2023-10-25T21:16:54.000Z",
 *                              "blocked_at": null,
 *                              "deleted_at": null
 *                          }
 */
userRouter.get('/email', userController.getUserByEmail)

/**
 * @swagger
 * paths:
 *  /users:
 *      post:
 *          summary: "회원가입"
 *          description: "POST 방식으로 유저를 등록한다."
 *          tags: [Users]
 *          requestBody:
 *              description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 등록)
 *              required: true
 *              content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                          description: "유저 고유아이디"
 *                      name:
 *                          type: string
 *                          description: "유저 이름"
 */
userRouter.get('/sns_id', userController.getUserBySnsId)

/**
 * @swagger
 * /api/user/update/{user_id}:
 *   patch:
 *    summary: "유저 수정"
 *    description: "Patch 방식을 통해 특정 유저 수정(단일 데이터를 수정할 때 사용함)"
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 유저 수정
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "유저 이름"
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 수정)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: string
 *                  example:
 *                    [
 *                      { "id": 1, "name": "유저1" },
 *                      { "id": 2, "name": "유저2" },
 *                      { "id": 3, "name": "유저3" },
 *                    ]
 */
userRouter.put('/', checkedUser, userController.updateUser)
// userRouter.put('/', userController.updateUser)

// 회원탈퇴
userRouter.delete('/', checkedUser, userController.deleteUser)
