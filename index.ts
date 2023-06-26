import express, { Request, Response, NextFunction } from 'express';
import { applefarmDB } from "./shared/lib/db"
import cors from 'cors';
import bodyParser from 'body-parser'

const appServer = async () => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
      
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