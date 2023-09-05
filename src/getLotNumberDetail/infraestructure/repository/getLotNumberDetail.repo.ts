import { ILotNumberDetail } from "@src/getLotNumberDetail/domain/getLotNumberDetail.dom";
import { IGetLotNumberDetailRepo, ImageReponse } from "@src/getLotNumberDetail/domain/getLotNumberDetail.repo";
import { Coordinate } from "@src/shared/domain/coordinates";
import { DBConexion } from "@src/shared/infrastructure/repository/dbConexion";

export class GetLotNumberDetailRepo implements IGetLotNumberDetailRepo {
  constructor(public readonly db: DBConexion) {}

  async getLotNumberById(lotNumberName: string): Promise<ILotNumberDetail | null> {
    await this.db.connect();

    const sql = `SELECT 
    AC.id_ac AS lotNumberId, 
    AC.num_anexo AS lotNumber, 
    V.fecha_r AS lastVisitDate, 
    V.id_visita AS lastVisitId, 
    F.id_tempo AS seasonId,
    CONCAT(U.nombre, ' ', U.apellido_p) AS userFullName,
    U.telefono AS userPhoneNumber,
    U.email AS userMail,
    TS.descripcion groundType,
    V.estado_fen AS phenologicalState,
    M.nom_hibrido AS varietyName,
    E.nombre AS specieName
    FROM anexo_contrato AC 
    left JOIN visita V USING (id_ac) 
    inner join ficha F using (id_ficha)
    inner join usuarios U ON (U.id_usuario = F.id_usuario) 
    INNER JOIN tipo_suelo TS ON (F.id_tipo_suelo = TS.id_tipo_suelo)
    inner join materiales M USING (id_materiales)
    inner join especie E ON (M.id_esp = E.id_esp)
    WHERE AC.num_anexo = :lotNumberName
    ORDER BY V.id_visita DESC
    LIMIT 1
    `;

    const data: ILotNumberDetail[] =
      (await this.db.conn?.query({ sql, bigIntAsNumber: true, namedPlaceholders: true }, { lotNumberName })) || [];
    await this.db.disconnect();

    return data.length === 0 ? null : data[0];
  }

  async getImages(id: string): Promise<ImageReponse[]> {
    await this.db.connect();

    const sql = `SELECT ruta_foto AS imagePath, medida_raices AS rootMeasure
    from fotos 
    INNER JOIN visita USING (id_visita) 
    WHERE id_ac = :lotNumberId AND vista = :vista
    order by id_visita desc`;

    const data: ImageReponse[] =
      (await this.db.conn?.query(
        { sql, bigIntAsNumber: true, namedPlaceholders: true },
        { lotNumberId: id, vista: "raices" }
      )) || [];
    await this.db.disconnect();
    return data;
  }

  async getCoordinates(id: string, seasonId: number, latId: number, longId: number): Promise<Coordinate> {
    await this.db.connect();

    console.log({ id });
    const sql = `select latitud_ficha,  longitud_ficha from ficha 
    inner join anexo_contrato using(id_ficha) 
    WHERE anexo_contrato.id_ac = :lotNumberId
    `;
    const data: { latitud_ficha: string; longitud_ficha: string }[] =
      (await this.db.conn?.query(
        { sql, bigIntAsNumber: true, namedPlaceholders: true },
        { lotNumberId: id, seasonId, latId, longId }
      )) || [];
    await this.db.disconnect();

    const lat = Number(data[0]?.latitud_ficha?.replace(",", ".") ?? 0);
    const long = Number(data[1]?.longitud_ficha?.replace(",", ".") ?? 0);

    return { lat, long };
  }
}
