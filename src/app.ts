import express, { Application, Request, Response } from 'express';
import { toNodeHandler } from "better-auth/node";
import { auth as betterAuth } from './lib/auth';
import cors from 'cors';
import auth, { UserRole } from './middleware/auth';
import { postRoute } from './modules/post/post.routes';
import { likeRoute } from './modules/like/like.routes';
import { commentRoute } from './modules/comment/comment.routes';

const app: Application = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded());

// better auth
app.all('/api/auth/*splat', toNodeHandler(betterAuth));
app.use('/api/post', postRoute);
app.use('/api/post/like', likeRoute);
app.use('/api/post/comment', commentRoute);


app.get('/', async (req: Request, res: Response) => {
    res.json({
        message: "Hello world"
    });
})


export default app;