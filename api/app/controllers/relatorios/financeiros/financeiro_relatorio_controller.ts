import PdfPrinter from "pdfmake";
import { Request, Response } from "express";
import { DefRelatorioGeralFinanceiro } from "./definicoes/relatorio_geral";

export const createRelatorioFinanceiro = async (req: Request, res: Response) => {
    var fonts = {
      Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      },
      Courier: {
        normal: 'Courier',
        bold: 'Courier-Bold',
        italics: 'Courier-Oblique',
        bolditalics: 'Courier-BoldOblique'
      }
    };
    
    const pdkMaker = new PdfPrinter(fonts);
    
    const document = pdkMaker.createPdfKitDocument(DefRelatorioGeralFinanceiro);
    let chunks: Buffer[] = [];
    document.on('data', chunk => chunks.push(chunk));
    document.on('end', () => {
        const result = Buffer.concat(chunks);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
        res.end(result);
    });
    document.end();
}

