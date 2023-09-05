import { Request, Response, Router } from "express";
import { getLotNumberDetail } from "../dependencies";
import { mwValidateKey } from "@src/shared/infrastructure/middlewares/validarToken";

export const getLotNumberDetailRoute = Router();

getLotNumberDetailRoute.get("/:key/lote/", [], (request: Request, response: Response) => {
  response.json({ ok: true });
});
getLotNumberDetailRoute.get("/:key/lote/:numAnexo", [mwValidateKey], getLotNumberDetail);
