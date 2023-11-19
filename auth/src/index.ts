import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';

const app = express();
const PORT = 3000;

app.use(express.json());
//
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
//
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);  
});