import { CoordinateId } from "@src/shared/domain/coordinates";
import { ISystemDetail } from "@src/shared/utils/constants";
import expres from "express";
declare global {
  namespace Express {
    interface Request {
      coordinatesId: CoordinateId;
      systemData: ISystemDetail;
    }
  }
}
