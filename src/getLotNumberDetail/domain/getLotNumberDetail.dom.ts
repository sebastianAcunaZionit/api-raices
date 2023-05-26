import { Coordinate } from "@src/shared/domain/coordinates";
import { LotNumberId } from "@src/shared/domain/lotNumber";

export interface IGetLotNumberDetail {
  lotNumberId: LotNumberId;
}

export interface ILotNumberDetail {
  lotNumberId: LotNumberId;
  lotNumber: string;
  lastVisitDate: string;
  lastVisitId: number;
  image: string[];
  coordinates: Coordinate;
  seasonId: number;
  latId: number;
  longId: number;
  userFullName: string;
  userMail: string;
  userPhoneNumber: string;
  groundType: string;
  phenologicalState: string;
  varietyName: string;
  specieName: string;
}

export class GetLotNumberDetail implements IGetLotNumberDetail {
  public readonly lotNumberId: LotNumberId;

  constructor({ lotNumberId }: IGetLotNumberDetail) {
    this.lotNumberId = lotNumberId;
  }
}
