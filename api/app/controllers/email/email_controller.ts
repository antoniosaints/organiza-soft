import { Request, Response } from "express";
import { sendEmail } from "../../services/email/email_service";
import { HttpErrorService, ResponseService } from "../../services";

export const enviarEmail = async (req: Request, res: Response) => {
  try {
    const { title, message, email } = req.body;
    await sendEmail(email, title, message);
    ResponseService.created(res, {
      message: "Email enviado com sucesso",
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
