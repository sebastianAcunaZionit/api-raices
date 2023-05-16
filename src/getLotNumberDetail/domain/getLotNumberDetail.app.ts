import { CoordinateId } from "@src/shared/domain/coordinates";
import { ISystemDetail } from "@src/shared/utils/constants";

export type Response = { statusCode: number; message: string; data: unknown };
export type RequestApp = { lotNumberId: string; coordinates: CoordinateId; systemData: ISystemDetail };

export interface IGetLotNumberDetailApp {
  run({ lotNumberId, coordinates }: RequestApp): Promise<Response>;
}
