import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/router';
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cookieParser())
app.use(cors({origin : 'http://localhost:5173'} ));

app.use('/api/v1', router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({
        status: 200,
        message: "ph university server runnig ....... ..... ..... .... .."
    })
});

// console.log(z);
app.get("/test", async(req: Request, res: Response) => {

    // Promise.reject(new Error('Simulated Unhandled Rejection'));
    // console.log(x);
    const a : string = 'testing....'
    res.send(a);
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;