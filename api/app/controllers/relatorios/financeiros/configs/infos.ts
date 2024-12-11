import { TDocumentInformation } from "pdfmake/interfaces";

export const informacoesPdf = (relatorioName: string = "Relatorio"): TDocumentInformation => {
  return {
    author: "Organiza Soft",
    creator: "Antonio Costa dos Santos",
    title: relatorioName,
    subject: relatorioName,
    creationDate: new Date(),
    keywords: relatorioName,
    modDate: new Date(),
    producer: "Organiza Soft",
  };
};
