// const passport = require('passport');
// const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
// import { userRepo } from './index'
// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
// dotenv.config()

// interface IProfile {
//    id: string;
//    response: {
//      email: string;
//      name: string;
//      profile_image: string;
//    };
//  }
 
// export const naver = () => {
//    passport.use(
//       'naver',
//       new NaverStrategy(
//          {
//             clientID: process.env.NAVER_ID,
//             clientSecret: process.env.NAVER_SECRET,
//             callbackURL: '/auth/naver/callback',
//          },
//          async (accessToken: any, refreshToken: any, profile: IProfile, done: any) => {
//             console.log('naver profile : ', profile);
//             console.log("accessToken ::: ", accessToken);
//             console.log("네이버 회원정보::: ", profile)

//             // return done({ accessToken, refreshToken })
            
//             try {
//                const exUser = await userRepo.getUser(profile.response.email);
//                // 이미 가입된 네이버 프로필이면 성공
//                if (exUser) {
//                   const accessToken = jwt.sign({ id: exUser.id }, 'jwt-secret-key', {
//                      algorithm: 'HS256',
//                      expiresIn: '1d'
//                   }) 

//                   const refreshToken = jwt.sign({ id: exUser.id }, 'jwt-secret-key', {
//                      algorithm: 'HS256',
//                      expiresIn: '14d'
//                   })

//                   const user = {
//                      email: profile.response.email,
//                      nickname: profile.response.name,
//                      snsId: profile.id,
//                      ProfileImages: profile.response.profile_image,
//                      accessToken: accessToken,
//                      refreshToken: refreshToken,
//                      provider: 'naver'
//                    };

//                   done(null, user);
//                } 
//                // else {
//                //    // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
//                //    const newUser = await userRepo.createUser({
//                //       email: profile.response.email,
//                //       nickname: profile.response.name,
//                //       userId: profile.id,
//                //       provider: "naver",
//                //     });
       
//                //     const accessToken = jwt.sign({ id: newUser.id }, "jwt-secret-key", {
//                //       algorithm: "HS256",
//                //       expiresIn: "1d",
//                //     });
//                //     const refreshToken = jwt.sign(
//                //       { id: newUser.id },
//                //       "jwt-secret-key",
//                //       {
//                //         algorithm: "HS256",
//                //         expiresIn: "14d",
//                //       }
//                //     );
       
//                //     const user = {
//                //       email: profile.response.email,
//                //       nickname: profile.response.name,
//                //       snsId: profile.id,
//                //       ProfileImages: profile.response.profile_image,
//                //       accessToken: accessToken,
//                //       refreshToken: refreshToken,
//                //     };
       
//                //     done(null, user);
//                // }
//             } catch (error) {
//                console.error(error);
//                done(error);
//             }
//          },
//       ),
//    );
// };