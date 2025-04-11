import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from "./routes/userRoutes";
import { authRouter } from "./routes/authRoutes";
import { coachRouter } from "./routes/coachRoutes";

const port = 3000;
const app = express();

//Middlewares:
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//Routes:
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api/coachAdmin', coachRouter);
// app.use('/api/admin',adminRouter);

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
})