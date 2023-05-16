import mariadb from "mariadb";

interface BdParams {
  host: string;
  bdName: string;
  user: string;
  password: string;
}

export class DBConexion {
  private readonly host: string;
  private readonly user: string;
  private readonly password: string;
  private readonly bdName: string;
  private _conn?: mariadb.Connection;

  constructor(bdParams: Partial<BdParams> = {}) {
    const params = this.getParams();
    this.host = bdParams.host ?? params.host;
    this.user = bdParams.user ?? params.user;
    this.password = bdParams.password ?? params.password;
    this.bdName = bdParams.bdName || params.bdName;
  }

  private getParams(): BdParams {
    let params = undefined;

    params = {
      host: process.env.BD_HOST || "",
      user: process.env.BD_USER || "",
      password: process.env.BD_PASS || "",
      bdName: process.env.BD_NAME_EXPORT || "",
    };

    return params;
  }

  public get conn() {
    return this._conn;
  }

  public async disconnect(): Promise<void> {
    if (!this._conn) return;
    await this._conn.end();
    this._conn = undefined;
  }

  public async connect() {
    if (this._conn) return;
    this._conn = await mariadb.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.bdName,
    });
    return;
  }
}
