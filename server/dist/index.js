"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = require("./routes/userRoutes");
const authRoutes_1 = require("./routes/authRoutes");
const port = 3000;
const app = (0, express_1.default)();
//Middlewares:
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ credentials: true }));
//Routes:
app.use('/api', userRoutes_1.userRouter);
app.use('/api', authRoutes_1.authRouter);
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
