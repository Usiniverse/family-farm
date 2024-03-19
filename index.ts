import express, { Request, Response, NextFunction } from 'express'
import { applefarmDB } from './shared/lib/db'
import cors from 'cors'
import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import dotenv from 'dotenv'
import { indexRouter } from './src/routers/'
import cookieParser from 'cookie-parser'
const passportConfig = require('./src/passport')
dotenv.config()

const appServer = async () => {
	const app = express()

	// 추가 설정 필요
	app.use(
		cors({
			origin: true, // 출처 허용 옵션
			credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
		}),
	)

	app.use(express.json())
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	try {
		await applefarmDB.startServer()
	} catch (err) {
		console.error(err)
		throw new Error(`Can not connect DATABASE`)
	}

	passportConfig()

	app.use(cookieParser(process.env.MY_KEY))
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
	)
	app.use(passport.initialize())
	app.use(passport.session())

	const { swaggerUi, specs } = require('./swagger/swagger')
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

	app.use('/', indexRouter)

	app.get('/', (req: Request, res: Response) => {
		res.sendFile(__dirname + '/login.html')
	})

	app.listen('8000', () => {
		console.log(`
            #############################################
                🛡️ Server listening on port: 8000 🛡️
            #############################################  
        `)
	})
}

if (require.main === module) {
	appServer()
}

export { appServer }
