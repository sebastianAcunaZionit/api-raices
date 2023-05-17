import httpStatus from "http-status";
import moment from "moment";
import { ResponseApp } from "@src/shared/domain/general";
import { IGetLotNumbersApp } from "../domain/getLotNumbers.app";
import { IGetLotNumbersRepo } from "../domain/getLotNumbers.repo";

export class GetLotNumberApp implements IGetLotNumbersApp {
  constructor(public repository: IGetLotNumbersRepo) {}
  async run(): Promise<ResponseApp> {
    try {
      const lotNumbers = await this.repository.getAll();
      const seasons = await this.repository.getAllSeasons();

      const data = seasons.map(season => {
        const lotNumber = lotNumbers
          .filter(lotNumber => lotNumber.seasonId == season.seasonId)
          .map(lotNumber => ({
            num_anexo: lotNumber.lotNumberName,
            fecha_visita: lotNumber.lastVisitDate ? moment(lotNumber.lastVisitDate).format("YYYY-MM-DD") : "sin fecha",
          }));

        return { temporada: season.name, anexos: lotNumber };
      });

      return { statusCode: httpStatus.OK, message: "lista de anexos", data };
    } catch (error) {
      console.log(error);
      let message = "Error consultando la api";
      let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
      if (typeof error === "string") {
        message = error;
        statusCode = httpStatus.BAD_REQUEST;
      }
      return { statusCode: statusCode, message: message, data: null };
    }
  }
}
