import dotenv from 'dotenv'
import passport from 'passport'
import { naver } from '../users/naver';
import { local } from './local'
import { KnexUserRepo } from '../users/userRepository';
import { applefarmDB } from '../../shared/lib/db';

const users = new KnexUserRepo(applefarmDB)

export const passportNaver = () => {
    // passport.serializeUser((user: any, done: any) => {
    //     // req.login(user, ...)의 user가 넘어와 값을 이용할수 있다.
    //     // console.log('직렬화', user[0].userId);
    //     done(null, user);
    // });
    // passport.deserializeUser((id: any, done: any) => {
    //     // req.session에 저장된 사용자 아이디를 바탕으로 DB 조회로 사용자 정보를 얻어낸 후 req.user에 저장.
    //     // 즉, id를 sql로 조회해서 전체 정보를 가져오는 복구 로직이다.
    //     users.getUserById(id)
    //     console.log('역직렬화', id);
    //     done(null, id);
    // });
    passport.serializeUser(function (user: any, done) {
        done(null, user)
      });

    passport.deserializeUser(function (user: any, done) {
    done(null, user);
    });

    local();
    naver();
};