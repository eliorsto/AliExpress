import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import { router as authRouter } from "./routes/authRouter";
import { router as userRouter } from "./routes/userRouter";

const port = process.env.PORT || 3000;

const app = express();

const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const hostingDir = nodeEnv === 'development' ? '' : '/or/projects/CloneApp/server';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(`${hostingDir}/auth`, authRouter);
app.use(`${hostingDir}/user`, userRouter);

app.get("/", (req, res) => {
  res.send("<h1>NodeJS Server is working</h1>");
});

connectDB().then(() => app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}));
