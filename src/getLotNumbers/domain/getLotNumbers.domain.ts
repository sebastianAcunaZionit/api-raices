import { LotNumberId } from "@src/shared/domain/lotNumber";
import { SeasonId } from "@src/shared/domain/season";

export interface IGetLotNumber {
  lotNumberId: LotNumberId;
  lotNumberName: string;
  lastVisitDate: string;
  seasonId: SeasonId;
}
