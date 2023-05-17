import { ISeason } from "@src/shared/domain/season";
import { IGetLotNumber } from "./getLotNumbers.domain";

export interface IGetLotNumbersRepo {
  getAll(): Promise<IGetLotNumber[]>;
  getAllSeasons(): Promise<ISeason[]>;
}
