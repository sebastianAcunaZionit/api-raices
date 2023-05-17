import { ResponseApp } from "@src/shared/domain/general";

export interface IGetLotNumbersApp {
  run(): Promise<ResponseApp>;
}
