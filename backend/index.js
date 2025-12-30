import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import loginRoutes from './routes/loginRoutes.js';
import homeRoutes from './routes/homeRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "https://loop-07er.onrender.com",
    "http://127.0.0.1:5173",              // local dev
    "https://loop-8my7rsutc-justin-2003s-projects.vercel.app"    // Vercel frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed methods
  credentials: true
}));

app.options("*", cors());
const PORT = 4000;

//routes
app.use("/", loginRoutes);
app.use("/home", homeRoutes);


app.listen(PORT, () =>
  console.log(`Backend running at port: ${PORT}`)
);
