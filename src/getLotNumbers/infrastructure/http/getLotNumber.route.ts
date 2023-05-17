import { mwValidateKey } from "@src/shared/infrastructure/middlewares/validarToken";
import { Router } from "express";
import { getLotNumbers } from "../dependencies";

export const getLotNumberRoute = Router();

getLotNumberRoute.get("/:key/", [mwValidateKey], getLotNumbers);
