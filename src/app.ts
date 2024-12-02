import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/router';

app.use(express.json());
app.use(cors());

app.use('/api/v1',router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({
        status: 200,
        message: "ph university server runnig ....... ..... ..... .... .."
    })
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;