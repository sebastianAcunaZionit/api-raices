import httpStatus from "http-status";

export type ErrorResponse = { statusCode: number; message: string; data: unknown };

const messageHashmap = {
  SqlError: (place: string): string =>
    `[${place}] : Ha ocurrido un problema a nivel de base de datos, por favor vuelva a intentar.`,
};

export class ErrorHandling {
  constructor(public readonly place: string, public readonly error: unknown) {}

  run(): ErrorResponse {
    if (typeof this.error === "string") {
      return { statusCode: httpStatus.BAD_REQUEST, data: null, message: `[${this.place}] : ${this.error}` };
    } else if (this.error instanceof Error) {
      const errorName = this.error.name as unknown as keyof typeof messageHashmap;
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: messageHashmap?.[errorName]?.(this.place) ?? `[${this.place}]: Error no manejado`,
      };
    } else {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: `[${this.place}]: Error no manejado`,
      };
    }
  }
}
