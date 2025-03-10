import express from "express";
import { userRouter } from "./routes/userRoutes";
import { authRouter } from "./routes/authRoutes";

const port = 3000;
const app = express();

//Routes:
app.use('/api', userRouter);
app.use('/api', authRouter);

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
})