import { IGetVilabDataService, VilabResponse } from "@src/shared/domain/getVilabData.domain";
import axios from "axios";

export class GetVilabDataService implements IGetVilabDataService {
  private readonly req;
  private readonly privateKey: string;
  private readonly baseUrl: string;
  constructor() {
    this.req = axios;
    this.privateKey = process.env.VILAB_KEY || "";
    this.baseUrl = process.env.VILAB_BASE_URL || "";
  }
  async getLotNumbers(): Promise<VilabResponse> {
    const lotNumberUrl = `predios/key/${this.privateKey}`;
    const axiosData = await this.req.get(`${this.baseUrl}/${lotNumberUrl}`).catch(() => {
      throw new Error("Error consultando api interna").message;
    });
    const { data }: { data: VilabResponse } = axiosData;
    return data;
  }
}
