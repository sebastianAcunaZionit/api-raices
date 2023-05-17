import { SeasonId } from "@src/shared/domain/season";

export interface IGetLotNumber {
  lotNumberName: string;
  lastVisitDate: string;
  seasonId: SeasonId;
}
