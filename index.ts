import express, { Request, Response, NextFunction } from 'express';
import { applefarmDB } from "./shared/lib/db"
import cors from 'cors';
import bodyParser from 'body-parser'
import passport from 'passport';
import kakaoStrategy from 'passport-kakao';

const appServer = async () => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    passport.use(
        new kakaoStrategy(
          {
            clientID: process.env.KAKAO_CLIENT_ID || '',
            clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
            callbackURL: process.env.KAKAO_CALLBACK_URL || '',
          },
          async (accessToken, refreshToken, profile, done) => {
            try {
              // 카카오 사용자 정보를 profile에서 추출
              const kakaoId = profile.id;
              const email = profile._json && profile._json.kakao_account && profile._json.kakao_account.email;
              const nickname = profile.displayName;
      
              // 카카오 ID가 DB에 이미 저장되어 있는지 확인
              const existingUser = await applefarmDB('users')
                .where({ kakao_id: kakaoId })
                .first();
      
              // 이미 저장된 사용자가 있다면, 해당 사용자 정보를 반환
              if (existingUser) {
                return done(null, existingUser);
              }
      
              // DB에 새로운 사용자 정보를 저장
              const newUser = await applefarmDB('users').insert({
                email,
                nickname,
                kakao_id: kakaoId,
              }).returning('*');
      
              // 저장된 사용자 정보를 반환
              done(null, newUser[0]);
            } catch (err) {
              done(err, false);
            }
          }
        )
      );
      
      app.use(passport.initialize());
      
      // 로그인 페이지로 이동할 때, /auth/kakao로 요청을 보내면 카카오 로그인 페이지로 이동
      app.get('/auth/kakao', passport.authenticate('kakao'));
      
      // 카카오 로그인 이후, 사용자 정보가 전달됨
      app.get(
        '/auth/kakao/callback',
        passport.authenticate('kakao', {
          failureRedirect: '/login',
        }),
        (req, res) => {
          // 로그인 성공 후 처리
          res.redirect('/');
        }
      );
      

    try {
        await applefarmDB.checkConnection()
    } catch(err) {
        console.error(err)
        throw new Error(`Can not connect DATABASE`) 
    }

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