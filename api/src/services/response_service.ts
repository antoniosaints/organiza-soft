import { Response } from "express";

class ResponseService {
  static success(res: Response, data: any, message = "success") {
    return res.status(200).json({
      status: "success",
      message,
      ...data,
    });
  }

  static created(res: Response, data: any, message = "Registro criado com sucesso") {
    return res.status(201).json({
      status: "success",
      message,
      ...data,
    });
  }

  static badRequest(res: Response, message = "Bad request", error: number = 400) {
    return res.status(error).json({
      status: "error",
      message,
      error,
    });
  }

  static unauthorized(res: Response, message = "Unauthorized", error: number = 401) {
    return res.status(error).json({
      status: "error",
      message,
      error,
    });
  }

  static forbidden(res: Response, message = "Forbidden", error: number = 403) {
    return res.status(error).json({
      status: "error",
      message,
      error,
    });
  }

  static notFound(res: Response, message = "Not found", error: number = 404,) {
    return res.status(error).json({
      status: "error",
      message,
      error,
    });
  }

  static internalError(
    res: Response,
    error: any,
    message = "Internal server error"
  ) {
    return res.status(500).json({
      status: "error",
      message,
      error,
    });
  }
}

export default ResponseService;
