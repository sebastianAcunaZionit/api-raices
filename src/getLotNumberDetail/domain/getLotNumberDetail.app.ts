import { CoordinateId } from "@src/shared/domain/coordinates";
import { ResponseApp } from "@src/shared/domain/general";
import { ISystemDetail } from "@src/shared/utils/constants";
export type RequestApp = { lotNumberId: string; coordinates: CoordinateId; systemData: ISystemDetail };

export interface IGetLotNumberDetailApp {
  run({ lotNumberId, coordinates }: RequestApp): Promise<ResponseApp>;
}
