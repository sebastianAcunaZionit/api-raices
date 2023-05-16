import { IGetLotNumberDetailApp } from "@src/getLotNumberDetail/domain/getLotNumberDetail.app";
import { Request, Response } from "express";
import httpStatus from "http-status";

export class GetLotNumberDetailController {
  constructor(public readonly app: IGetLotNumberDetailApp) {}

  async run(req: Request, res: Response) {
    const { numAnexo } = req.params;
    const coordinates = req.coordinatesId;
    const system = req.systemData;
    const { statusCode, message, data } = await this.app.run({
      lotNumberId: numAnexo,
      coordinates,
      systemData: system,
    });
    res.status(statusCode).json({ ok: statusCode === httpStatus.OK, message, data });
  }
}
