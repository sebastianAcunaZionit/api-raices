import { LotNumberId } from "@src/shared/domain/lotNumber";
import { ILotNumberDetail } from "./getLotNumberDetail.dom";
import { Coordinate } from "@src/shared/domain/coordinates";

export type ImageReponse = { imagePath: string; rootMeasure: string };
export interface IGetLotNumberDetailRepo {
  getLotNumberById(lotNumberName: string): Promise<ILotNumberDetail | null>;
  getCoordinates(id: LotNumberId, seasonId: number, latId: number, longId: number): Promise<Coordinate>;
  getImages(id: LotNumberId): Promise<ImageReponse[]>;
}
