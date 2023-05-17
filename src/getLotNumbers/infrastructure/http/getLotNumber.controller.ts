import { IGetLotNumbersApp } from "@src/getLotNumbers/domain/getLotNumbers.app";
import { Request, Response } from "express";
import httpStatus from "http-status";

export class GetLotNumberController {
  constructor(public readonly app: IGetLotNumbersApp) {}
  async run(req: Request, res: Response) {
    const { statusCode, message, data } = await this.app.run();
    res.status(statusCode).json({ ok: statusCode === httpStatus.OK, message, data });
  }
}
