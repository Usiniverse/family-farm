import express, { Request, Response, NextFunction } from 'express';
import { applefarmDB } from "./shared/lib/db"
import cors from 'cors';
import bodyParser from 'body-parser'
import { userRouter } from './src/users/userRouter'
import { postRouter } from './src/posts/postRouter';
import passport from 'passport'
import session from 'express-session';
import dotenv from 'dotenv'
import { authRouter } from './src/users/naverRouter';
import cookieParser from 'cookie-parser'
const passportConfig = require('./src/passport')
dotenv.config()

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

    passportConfig();

    app.use(cookieParser(process.env.MY_KEY));
    app.use(
        session({
            resave: false,
            saveUninitialized: false,
            secret: process.env.MY_KEY as string,
            cookie: {
                httpOnly: true,
                secure: false,
            },
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/auth', authRouter)
    app.use('/users', userRouter)
    app.use('/posts', postRouter)

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