import { IGetVilabDataApp, IGetVilabDataService, IVilabFilters, VilabPredios } from "../domain/getVilabData.domain";

export class GetVilabData implements IGetVilabDataApp {
  constructor(public readonly service: IGetVilabDataService) {}

  async run(filters: IVilabFilters): Promise<VilabPredios | undefined> {
    const data = await this.service.getLotNumbers();
    const lotNumber = data.predios.find(predio => predio.Lote === filters.lotNumber);
    return lotNumber;
  }
}
