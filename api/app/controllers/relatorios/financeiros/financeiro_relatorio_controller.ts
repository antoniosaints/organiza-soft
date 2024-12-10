import PdfPrinter from "pdfmake";
import { Request, Response } from "express";
import { DefRelatorioGeralFinanceiro } from "./definicoes/relatorio_geral";
import { fontsPdfMake } from "./configs/fonts";
import { IQueryParams } from "./dtos/IQueryParams";

export const createRelatorioFinanceiro = async (req: Request, res: Response) => {
    const pdkMaker = new PdfPrinter(fontsPdfMake);
    const query: IQueryParams = req.query;
    const dataMake = await DefRelatorioGeralFinanceiro(query, req);
    const document = pdkMaker.createPdfKitDocument(dataMake);
    let chunks: Buffer[] = [];
    document.on('data', chunk => chunks.push(chunk));
    document.on('end', () => {
        const result = Buffer.concat(chunks);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=relatorio.pdf');
        res.end(result);
    });
    document.end();
}

export const downloadRelatorioFinanceiro = async (req: Request, res: Response) => {
  const pdkMaker = new PdfPrinter(fontsPdfMake);
  const query: IQueryParams = req.query;
  const dataMake = await DefRelatorioGeralFinanceiro(query, req);
  const document = pdkMaker.createPdfKitDocument(dataMake);
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
