import passport from 'passport'
import { userRepo } from '../users/index'
const naver = require('./naver')
const local = require('./local')

module.exports = () => {
    passport.serializeUser(function (user: any, done: any) {
        console.log('직렬화', user.snsId);
        done(null, user.snsId)
     });
     
    passport.deserializeUser(function (snsId: string, done: any) {
        userRepo.getUserById(snsId)
        .then(user => done(null, user))
        .catch(err => done(err))
    });

    local();
    naver();
}