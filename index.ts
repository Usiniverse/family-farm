import express, { Request, Response, NextFunction } from 'express';
import { applefarmDB } from "./shared/lib/db"
import cors from 'cors';
import bodyParser from 'body-parser'
import { userRouter } from './src/users/router'
import cookieSession from 'cookie-session'
import passport from 'passport'
import session from 'express-session';
import { userRepo } from './src/users/index'
import jwt from 'jsonwebtoken'
const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
import dotenv from 'dotenv'
import { naverCallback } from './src/users/naverCallback'
import { log } from 'console';
dotenv.config()

interface IProfile {
   id: string;
   response: {
     email: string;
     name: string;
     profile_image: string;
   };
 }

const appServer = async () => {
    const app = express();

    app.use(cors());
    app.use(express.json())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
      
    try {
        await applefarmDB.checkConnection()
    } catch(err) {
        console.error(err)
        throw new Error(`Can not connect DATABASE`) 
    }

    app.use(cookieSession({
        keys: ['node_yun'],
        // expires: 100 * 60 * 60 // 쿠키 유효기간 1시간
      }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

    // ---------------------패스포트 설정 ---------------------------
    passport.use(
        new NaverStrategy(
           {
              clientID: process.env.NAVER_ID,
              clientSecret: process.env.NAVER_SECRET,
              callbackURL: '/users/naver/callback',
           },
           async (accessToken: any, refreshToken: any, profile: IProfile, done: any) => {
              console.log("accessToken ::: ", accessToken);
              console.log("refreshToken ::: ", refreshToken);
              console.log("네이버 회원정보::: ", profile)
  
              // return done({ accessToken, refreshToken })
              
              try {
                 const exUser = await userRepo.getUser(profile.response.email);
                 // 이미 가입된 네이버 프로필이면 성공
                 if (exUser) {
                    const accessToken = jwt.sign({ id: exUser.id }, 'jwt-secret-key', {
                       algorithm: 'HS256',
                       expiresIn: '1d'
                    }) 
  
                    const refreshToken = jwt.sign({ id: exUser.id }, 'jwt-secret-key', {
                       algorithm: 'HS256',
                       expiresIn: '14d'
                    })
  
                    const user = {
                       email: profile.response.email,
                       nickname: profile.response.name,
                       snsId: profile.id,
                       ProfileImages: profile.response.profile_image,
                       accessToken: accessToken,
                       refreshToken: refreshToken,
                       provider: 'naver'
                     };
  
                    done(null, user);
                 } 
              } catch (error) {
                 console.error(error);
                 done(error);
              }
           },
        ),
    );

    passport.serializeUser(function (user: any, done) {
        done(null, user)
      });

    passport.deserializeUser(function (user: any, done) {
    done(null, user);
    });

    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.send('Hello World!');
    });

    app.listen('8000', () => {
        console.log(`
            #############################################
                🛡️ Server listening on port: 8000 🛡️
            #############################################  
        `);
    })

    // 네이버 로그인
    app.get('/users/naver', passport.authenticate('naver'));

    // 네이버 로그인 콜백
    app.get("/users/naver/callback", passport.authenticate('naver'), naverCallback)

    // app.use('/users', userRouter)
    // app.post("/users", createUserController.createUserController)
}

if (require.main === module) {
    appServer()
}

export { appServer }