class ResponseService {
  static success(res: any, data: any, message = "success") {
    return res.status(200).json({
      status: "success",
      message,
      data,
    });
  }

  static created(res: any, data: any, message = "Registro criado com sucesso") {
    return res.status(201).json({
      status: "success",
      message,
      data,
    });
  }

  static badRequest(res: any, error: any, message = "Bad request") {
    return res.status(400).json({
      status: "error",
      message,
      error,
    });
  }

  static unauthorized(res: any, error: any, message = "Unauthorized") {
    return res.status(401).json({
      status: "error",
      message,
      error,
    });
  }

  static forbidden(res: any, error: any, message = "Forbidden") {
    return res.status(403).json({
      status: "error",
      message,
      error,
    });
  }

  static notFound(res: any, error: any, message = "Not found") {
    return res.status(404).json({
      status: "error",
      message,
      error,
    });
  }

  static internalError(
    res: any,
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
