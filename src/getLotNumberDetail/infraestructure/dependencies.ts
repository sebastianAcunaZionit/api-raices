import { Request, Response } from "express";
import { SYSTEMS } from "@src/shared/utils/constants";
import { DBConexion } from "@src/shared/infrastructure/repository/dbConexion";
import { GetLotNumberDetailRepo } from "./repository/getLotNumberDetail.repo";
import { GetLotNumberDetailApp } from "../application/getLotNumberDetail.app";
import { GetLotNumberDetailController } from "./http/getLotNumberDetail.controller";

export const getLotNumberDetail = async (req: Request, res: Response) => {
  const { key } = req.params;

  const bd = new DBConexion({ bdName: SYSTEMS[key].internalName || "" });
  const repository = new GetLotNumberDetailRepo(bd);
  const application = new GetLotNumberDetailApp(repository);
  return new GetLotNumberDetailController(application).run(req, res);
};
