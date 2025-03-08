import express from "express";
import { userRouter } from "../routes/userRoutes";

const port = 3000;
const app = express();

//Routes:
app.use('/api', userRouter);

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
})