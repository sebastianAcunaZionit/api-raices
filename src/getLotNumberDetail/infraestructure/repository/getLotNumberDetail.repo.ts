import { ILotNumberDetail } from "@src/getLotNumberDetail/domain/getLotNumberDetail.dom";
import { IGetLotNumberDetailRepo } from "@src/getLotNumberDetail/domain/getLotNumberDetail.repo";
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

  async getImages(id: string): Promise<{ imagePath: string } | null> {
    await this.db.connect();

    const sql = `SELECT ruta_foto imagePath 
    from fotos 
    INNER JOIN visita USING (id_visita) 
    WHERE id_ac = :lotNumberId 
    order by id_visita desc 
    limit 1`;

    const data: { imagePath: string }[] =
      (await this.db.conn?.query({ sql, bigIntAsNumber: true, namedPlaceholders: true }, { lotNumberId: id })) || [];
    await this.db.disconnect();
    return data.length === 0 ? null : data[0];
  }

  async getCoordinates(id: string, seasonId: number, latId: number, longId: number): Promise<Coordinate> {
    await this.db.connect();

    console.log({ id });
    const sql = `select valor from detalle_visita_prop 
    inner join prop_cli_mat PCM using(id_prop_mat_cli) 
    inner join visita using(id_visita)
    where (PCM.identificador = :latId OR PCM.identificador = :longId) AND id_tempo = :seasonId AND visita.id_ac = :lotNumberId
    group by PCM.identificador
    order by PCM.orden asc
    LIMIT 2
    `;
    const data: { valor: string }[] =
      (await this.db.conn?.query(
        { sql, bigIntAsNumber: true, namedPlaceholders: true },
        { lotNumberId: id, seasonId, latId, longId }
      )) || [];
    await this.db.disconnect();

    const lat = Number(data[0]?.valor.replace(",", "."));
    const long = Number(data[1]?.valor.replace(",", "."));

    return { lat, long };
  }
}
