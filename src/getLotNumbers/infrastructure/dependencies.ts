import { DBConexion } from "@src/shared/infrastructure/repository/dbConexion";
import { SYSTEMS } from "@src/shared/utils/constants";
import { Request, Response } from "express";
import { GetLotNumberRepo } from "./repository/GetLotNumber.repo";
import { GetLotNumberApp } from "../application/GetLotNumber.app";
import { GetLotNumberController } from "./http/getLotNumber.controller";

export const getLotNumbers = async (req: Request, res: Response) => {
  const { key } = req.params;

  const bd = new DBConexion({ bdName: SYSTEMS[key].internalName || "" });
  const repository = new GetLotNumberRepo(bd);
  const application = new GetLotNumberApp(repository);
  return new GetLotNumberController(application).run(req, res);
};
