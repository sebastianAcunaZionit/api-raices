export interface IVilabFilters {
  lotNumber: string;
}

export interface VilabResponse {
  predios: VilabPredios[];
}

export interface VilabPredios {
  Id: number;
  Nombre: string;
  Fecha_Plantacion: Date;
  Estado_Desarrollo: string;
  Cultivo: string;
  Lote: string;
  Tipo_Imagen: string;
  Estacion_id: number;
  Estacion_nombre: string;
  Estacion_lat: number;
  Estacion_long: number;
  Estacion_institucion: string;
  Estacion_fecha_inicio: Date;
  Poligono: string;
}

export interface IGetVilabDataApp {
  run(filters: IVilabFilters): Promise<VilabPredios | undefined>;
}

export interface IGetVilabDataService {
  getLotNumbers(): Promise<VilabResponse>;
}
