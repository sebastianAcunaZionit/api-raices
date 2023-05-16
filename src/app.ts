import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const port = process.env.PORT || 3001;

app.listen(() => console.log(`Running at port ${port}`));
