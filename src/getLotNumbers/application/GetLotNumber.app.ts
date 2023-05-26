import httpStatus from "http-status";
import moment from "moment";
import { ResponseApp } from "@src/shared/domain/general";
import { IGetLotNumbersApp } from "../domain/getLotNumbers.app";
import { IGetLotNumbersRepo } from "../domain/getLotNumbers.repo";

type LotNumberResponse = {
  lote: string;
  fecha_visita: string;
  especie: string;
  variedad: string;
};
type data = { temporada: string; anexos: LotNumberResponse[]; total: number };
export class GetLotNumberApp implements IGetLotNumbersApp {
  constructor(public repository: IGetLotNumbersRepo) {}
  async run(): Promise<ResponseApp> {
    try {
      const lotNumbers = await this.repository.getAll();
      const seasons = await this.repository.getAllSeasons();

      const data: data[] = [];

      for (const season of seasons) {
        const lotNumberReponse: LotNumberResponse[] = [];
        const filterLN = lotNumbers.filter(lotNumber => lotNumber.seasonId == season.seasonId);
        for (const lotNumber of filterLN) {
          const ultimaVisita = await this.repository.getLastVisit(lotNumber.lotNumberId);
          lotNumberReponse.push({
            lote: lotNumber.lotNumberName,
            fecha_visita: ultimaVisita?.lastVisitDate
              ? moment(ultimaVisita.lastVisitDate).format("YYYY-MM-DD")
              : "sin fecha",
            especie: lotNumber.specieName,
            variedad: lotNumber.varietyName,
          });
        }
        data.push({ temporada: season.name, anexos: lotNumberReponse, total: lotNumberReponse.length });
      }

      return { statusCode: httpStatus.OK, message: "lista de anexos", data: data.filter(el => el.anexos.length > 0) };
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
