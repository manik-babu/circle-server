import express, { Application, Request, Response } from 'express';
import { toNodeHandler } from "better-auth/node";
import { auth as betterAuth } from './lib/auth';
import cors from 'cors';
import { postRoute } from './modules/post/post.routes';
import { likeRoute } from './modules/like/like.routes';
import { commentRoute } from './modules/comment/comment.routes';
import globalErrorHandler from './middleware/errorHandler';

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded());

// better auth
app.all('/api/auth/*splat', toNodeHandler(betterAuth));

// custom routes
app.use('/api/post', postRoute);
app.use('/api/post/like', likeRoute);
app.use('/api/post/comment', commentRoute);


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "API is running successfully",
        server: "Circle API",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});
app.use((req: Request, res: Response) => {
    res.status(404).json({
        ok: false,
        message: "Route not found",
        method: req.method,
        url: req.url,
        timestamp: new Date().toISOString()
    })

})
app.use(globalErrorHandler);


export default app;