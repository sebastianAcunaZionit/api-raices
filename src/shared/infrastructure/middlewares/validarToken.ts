import { SYSTEMS } from "@src/shared/utils/constants";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ErrorHandling } from "@src/shared/utils/ErrorHandling";

export const mwValidateAnex = async (req: Request, res: Response, next: NextFunction) => {
  const { key } = req.params;
  if (!key) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      ok: false,
      message: "No hay key en la peticion",
      data: null,
    });
  }

  try {
    if (key !== process.env.KEY_EXPORT && key !== process.env.KEY_VEGETABLES) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        ok: false,
        message: "Key no invalida",
        data: null,
      });
    }

    const system = SYSTEMS[key];
    if (!system) throw new Error("Key invalida").message;
    req.coordinatesId = { latId: system.latId, longId: system.longId };
    req.systemData = system;
    next();
  } catch (error) {
    console.log(error);
    const handleError = new ErrorHandling("mwValidateKey", error).run();
    return res.status(httpStatus.UNAUTHORIZED).json({
      ok: false,
      message: handleError.message,
      data: null,
    });
  }
};
