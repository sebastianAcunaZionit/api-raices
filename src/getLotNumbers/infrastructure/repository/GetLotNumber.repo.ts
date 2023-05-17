import { IGetLotNumber } from "@src/getLotNumbers/domain/getLotNumbers.domain";
import { IGetLotNumbersRepo } from "@src/getLotNumbers/domain/getLotNumbers.repo";
import { ISeason } from "@src/shared/domain/season";
import { DBConexion } from "@src/shared/infrastructure/repository/dbConexion";

export class GetLotNumberRepo implements IGetLotNumbersRepo {
  constructor(public readonly db: DBConexion) {}

  async getAll(): Promise<IGetLotNumber[]> {
    await this.db.connect();

    const sql = `SELECT AC.id_ac AS lotNumberId, AC.num_anexo AS lotNumberName, V.fecha_r AS lastVisitDate, V.id_visita AS lastVisitId, F.id_tempo AS seasonId
    FROM anexo_contrato AC 
    left JOIN visita V USING (id_ac) 
    inner join ficha F using (id_ficha)
    GROUP BY AC.id_ac
    ORDER BY V.id_visita DESC `;

    const data: IGetLotNumber[] =
      (await this.db.conn?.query({ sql, bigIntAsNumber: true, namedPlaceholders: true }, {})) || [];
    await this.db.disconnect();
    return data;
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
