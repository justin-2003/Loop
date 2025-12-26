import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import loginRoutes from './routes/loginRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
const PORT = 4000;

//routes
app.use("/", loginRoutes);


app.listen(PORT, () =>
  console.log(`Backend running at http://127.0.0.1:${PORT}`)
);
