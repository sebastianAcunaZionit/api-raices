import { Router } from "express";
import { getLotNumberDetail } from "../dependencies";
import { mwValidateAnex } from "@src/shared/infrastructure/middlewares/validarToken";

export const getLotNumberDetailRoute = Router();
getLotNumberDetailRoute.get("/:key/id/:numAnexo", [mwValidateAnex], getLotNumberDetail);
