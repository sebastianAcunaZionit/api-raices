import axios from "axios";
import { IGetLotNumberDetailApp, RequestApp } from "../domain/getLotNumberDetail.app";
import { IGetLotNumberDetailRepo } from "../domain/getLotNumberDetail.repo";
import httpStatus from "http-status";
import moment from "moment";
import { ResponseApp } from "@src/shared/domain/general";
import vilabService from "@src/shared/vilab.dependency";

export class GetLotNumberDetailApp implements IGetLotNumberDetailApp {
  constructor(public readonly repository: IGetLotNumberDetailRepo) {}

  async run({ lotNumberId, coordinates, systemData }: RequestApp): Promise<ResponseApp> {
    try {
      const lotNumber = await this.repository.getLotNumberById(lotNumberId);
      if (!lotNumber) throw new Error("Anexo no existe.").message;
      const coordinatesList = await this.repository.getCoordinates(
        lotNumber.lotNumberId,
        lotNumber.seasonId,
        coordinates.latId,
        coordinates.longId
      );

      const image = await this.repository.getImages(lotNumber.lotNumberId);
      let base64Image = "No contiene imagen";
      let urlImagen = "No contiene imagen";
      if (image) {
        urlImagen = `${systemData.baseUrl}/${image?.imagePath
          .replaceAll("../", "")
          .replaceAll(`${systemData.oldImagePath}`, `${systemData.newImagePath}`)}`;
        base64Image = await this.getEncodedImage(urlImagen);
      }

      const lastVisitDate = lotNumber.lastVisitDate
        ? moment(lotNumber.lastVisitDate).format("YYYY-MM-DD")
        : "Sin visita registrada";

      const vilabLotNumber = await vilabService.run({ lotNumber: lotNumber.lotNumber });

      const data = {
        lote: lotNumber.lotNumber,
        fechaVisita: lastVisitDate,
        tipoSuelo: lotNumber.groundType,
        estadoFenologico: lotNumber.phenologicalState,
        encargado: {
          nombre: lotNumber.userFullName,
          telefono: lotNumber.userPhoneNumber,
          correo: lotNumber.userMail,
        },
        coordenadas: coordinatesList,
        poligonos: vilabLotNumber ? JSON.parse(vilabLotNumber.Poligono) : {},
        urlImagen: urlImagen,
        imagen: base64Image,
      };

      return { statusCode: httpStatus.OK, message: "Detalle de anexo", data };
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

  private async getEncodedImage(url: string) {
    const data = await axios
      .get(url, { responseType: "arraybuffer" })
      .then(response => Buffer.from(response.data, "binary").toString("base64"))
      .catch(() => "No se econtro imagen");
    return data;
  }
}
