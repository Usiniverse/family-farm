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
import { authRouter } from './src/users/naverRouter';
dotenv.config()

// interface IProfile {
//    id: string;
//    response: {
//      email: string;
//      name: string;
//      profile_image: string;
//    };
//  }

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

    app.use('/auth', authRouter)
    app.use('/users', userRouter)

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
}

if (require.main === module) {
    appServer()
}

export { appServer }