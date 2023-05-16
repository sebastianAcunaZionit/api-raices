export type ISystemDetail = {
  id: number;
  name: string;
  logo: string;
  internalName?: string;
  latId: number;
  longId: number;
  baseUrl: string;
  oldImagePath: string;
  newImagePath: string;
};
export type ISystyem = Record<string, ISystemDetail>;
export const BD_EXPORT = 3;
export const BD_VEGETABLES = 4;

export const SYSTEMS: ISystyem = {
  [`${process.env.KEY_EXPORT || "XX_NO_KEY_EXP"}`]: {
    id: BD_EXPORT,
    logo: "https://curiexport.zcloud.cl/assets/images/curimapu_logo_cliente.png",
    name: "Curimapu Export",
    internalName: process.env.BD_NAME_EXPORT || "",
    latId: Number(process.env.LATID_EXP) || 50,
    longId: Number(process.env.LONGID_EXP) || 51,
    baseUrl: "https://curiexport.zcloud.cl/",
    oldImagePath: "curimapu_docum/img_android",
    newImagePath: "curimapu_img_android_comprimida",
  },
  [`${process.env.KEY_VEGETABLES || "XX_NO_KEY_VEG"}`]: {
    id: BD_VEGETABLES,
    logo: "https://curivegetables.zcloud.cl/assets/images/vegetable_logo_cliente.png",
    name: "Curimapu Vegetables",
    internalName: process.env.BD_NAME_VEGETABLES || "",
    latId: Number(process.env.LATID_VEG) || 50,
    longId: Number(process.env.LONGID_VEG) || 51,
    baseUrl: "https://curivegetables.zcloud.cl/",
    oldImagePath: "curimapu_vegetables_docum/img_android",
    newImagePath: "curimapu_veg_img_docum_comp",
  },
};
