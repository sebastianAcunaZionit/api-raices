import { IGetLotNumber } from "@src/getLotNumbers/domain/getLotNumbers.domain";
import { IGetLotNumbersRepo } from "@src/getLotNumbers/domain/getLotNumbers.repo";
import { LotNumberId } from "@src/shared/domain/lotNumber";
import { ISeason } from "@src/shared/domain/season";
import { DBConexion } from "@src/shared/infrastructure/repository/dbConexion";

export class GetLotNumberRepo implements IGetLotNumbersRepo {
  constructor(public readonly db: DBConexion) {}

  async getAll(): Promise<IGetLotNumber[]> {
    await this.db.connect();

    const sql = `SELECT 
    AC.id_ac AS lotNumberId, 
    AC.num_anexo AS lotNumberName, 
    V.fecha_r AS lastVisitDate, 
    V.id_visita AS lastVisitId, 
    F.id_tempo AS seasonId,
    M.nom_hibrido AS varietyName,
    E.nombre AS specieName
    FROM anexo_contrato AC 
    left JOIN visita V USING (id_ac) 
    inner join ficha F using (id_ficha)
    inner join materiales M using (id_materiales)
    inner join especie E ON (M.id_esp = E.id_esp)
    GROUP BY AC.id_ac
    ORDER BY V.id_visita DESC `;

    const data: IGetLotNumber[] =
      (await this.db.conn?.query({ sql, bigIntAsNumber: true, namedPlaceholders: true }, {})) || [];
    await this.db.disconnect();
    return data;
  }

  async getLastVisit(lotNumberId: LotNumberId): Promise<IGetLotNumber | null> {
    await this.db.connect();

    const sql = `SELECT V.fecha_r AS lastVisitDate, V.id_visita AS lastVisitId
    FROM visita V 
    WHERE V.id_ac = :lotNumberId
    ORDER BY V.id_visita DESC LIMIT 1`;

    const data: IGetLotNumber[] =
      (await this.db.conn?.query({ sql, bigIntAsNumber: true, namedPlaceholders: true }, { lotNumberId })) || [];
    await this.db.disconnect();
    return data.length > 0 ? data[0] : null;
  }

  async getAllSeasons(): Promise<ISeason[]> {
    await this.db.connect();

    const sql = `SELECT id_tempo AS seasonId, nombre AS name FROM temporada ORDER BY nombre ASC `;

    const data: ISeason[] =
      (await this.db.conn?.query({ sql, bigIntAsNumber: true, namedPlaceholders: true }, {})) || [];
    await this.db.disconnect();
    return data;
  }
}
