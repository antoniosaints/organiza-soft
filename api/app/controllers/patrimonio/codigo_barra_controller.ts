import BwipJs from "bwip-js";
import { Request, Response } from "express";

export const getCodigoBarra = (req: Request, res: Response) => {
    BwipJs.toBuffer(
      {
        bcid: 'ean13',
        text: req.params.texto,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: 'center',
        barcolor: '#fff',
        textcolor: '#FFFFFF'
      },
      (err, png) => {
        if (err) {
          res.status(500).send('Erro ao gerar o código de barras');
        } else {
          res.set('Content-Type', 'image/png');
          res.send(png);
        }
      }
    );
  };