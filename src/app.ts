import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', async (req: Request, res: Response) => {
    res.json({
        message: "Hello world"
    });
})


export default app;