// import express from 'express';
// import passport from 'passport';
// // import NaverStrategy from 'passport-naver';
// const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
// import session from 'express-session';
// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
// dotenv.config()
// import { userRepo } from './index'

// interface IProfile {
//    id: string;
//    response: {
//      email: string;
//      name: string;
//      profile_image: string;
//    };
//  }

// const app = express();

// app.use(express.json());
// app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Replace these with your Naver API credentials
// const naverClientId = 'OS67gvVkzjoLCwcu2BjQ';
// const naverClientSecret = '0UzYU19A0J';

// passport.use(
//   new NaverStrategy(
//     {
//         clientID: naverClientId,
//         clientSecret: naverClientSecret,
//         callbackURL: 'http://localhost:8000/users/naver/callback',
//     },
//     async (accessToken: any, refreshToken: any, profile: IProfile, done: any) => {
//       // Handle user data here, e.g., save to your database or session
//       console.log('naver profile : ', profile);
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
//             } catch (error) {
//                 console.error(error);
//                 done(error);
//             }
//       return done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user: any, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user: any, done) => {
//   done(null, user);
// });

// app.get('/', (req, res) => {
//   res.send('Welcome to Naver Login Example');
// });

// app.get('/users/naver', passport.authenticate('naver'));

// app.get('/users/naver/callback', passport.authenticate('naver', { failureRedirect: '/' }), (req, res) => {
//   // Successful authentication, redirect to a success page or handle it as needed
//   res.redirect('/success');
// });

// app.get('/success', (req, res) => {
//   res.send('Successfully authenticated with Naver');
// });

// app.listen(8000, () => {
//   console.log('Server started on http://localhost:8000');
// });
