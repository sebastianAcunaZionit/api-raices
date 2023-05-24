import { ISeason } from "@src/shared/domain/season";
import { IGetLotNumber } from "./getLotNumbers.domain";
import { LotNumberId } from "@src/shared/domain/lotNumber";

export interface IGetLotNumbersRepo {
  getAll(): Promise<IGetLotNumber[]>;
  getAllSeasons(): Promise<ISeason[]>;
  getLastVisit(lotNumberId: LotNumberId): Promise<IGetLotNumber | null>;
}
