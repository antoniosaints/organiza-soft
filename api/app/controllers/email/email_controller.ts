import { Request, Response } from "express";
import { sendEmail } from "../../services/email/email_service";
import { HttpErrorService, ResponseService } from "../../services";
interface IBodyEmail {
  title: string;
  message: string;
  email: string;
}
export const enviarEmail = async (req: Request, res: Response) => {
  try {
    const { title, message, email } = req.body as IBodyEmail;
    const response = await sendEmail(email, title, message);
    ResponseService.created(res, {
      message: "Email enviado com sucesso",
      data: response,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};