import { Request, Response } from "express";

export const asaasWebhook = async (req: Request, res: Response) => {
    const body = req.body;

    switch (body.event) {
      case 'PAYMENT_CREATED':
        console.log(`Pagamento criado: ${body}`);
        break;
      case 'PAYMENT_RECEIVED':
        break;
      // ... trate outos eventos
      default:
        console.log(`Este evento não é aceito ${body.event}`);
    }
    res.json({received: true});
}
