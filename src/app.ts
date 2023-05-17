import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { getLotNumberDetailRoute } from "./getLotNumberDetail/infraestructure/http/getLotNumberDetail.route";
import { getLotNumberRoute } from "./getLotNumbers/infrastructure/http/getLotNumber.route";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const port = process.env.PORT || 3001;

const baseUrl = "/api/v1";
app.use(`${baseUrl}/anexos`, [getLotNumberDetailRoute, getLotNumberRoute]);

app.listen(port, () => console.log(`Running at port ${port}`));
