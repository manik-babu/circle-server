import express, { Application, Request, Response } from 'express';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import cors from 'cors';

const app: Application = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded());
// better auth
app.all('/api/auth/*splat', toNodeHandler(auth));


app.get('/', async (req: Request, res: Response) => {
    res.json({
        message: "Hello world"
    });
})


export default app;