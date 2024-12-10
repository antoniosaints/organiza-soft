import { TDocumentDefinitions } from "pdfmake/interfaces";
import { imageProfile } from "../configs/profile";
import { relatorioVendasMensal } from "../data/relatorio_vendas_mensal";
import { defaultPermissions } from "../configs/permissions";
import { IQueryParams } from "../dtos/IQueryParams";
import { Request } from "express";

export const DefRelatorioGeralFinanceiro = async (query: IQueryParams, request: Request): Promise<TDocumentDefinitions> => {
  const data = await relatorioVendasMensal(request);
  return {
    language: "pt-br",
    version: "1.3",
    pageSize: "A4",
    watermark: query.marca === "sim" ? { text: "Organiza Soft", color: "blue", opacity: 0.1, bold: true } : undefined,
    pageOrientation: "portrait",
    ownerPassword: "123",
    permissions: defaultPermissions(query),
    info: {
      author: "Organiza Soft",
      creator: "Antonio Costa dos Santos",
      title: "Relatório Financeiro",
      subject: "Relatório Financeiro",
      creationDate: new Date(),
      keywords: "Relatório Financeiro",
      modDate: new Date(),
      producer: "Organiza Soft",
    },
    content: [
      {
        marginBottom: 10,
        columns: [
          {
            image: imageProfile,
            width: 75,
            height: 75,
          },
          {
            text: [
              { text: "Organiza Soft\n", style: "header" },
              { text: "Contato: 9998414-0666\n", style: "subheader" },
              { text: "E-mail: costaantonio883@gmail.com\n", style: "subheader" },
              {
                text:
                  "Data de criação: " + new Date().toLocaleDateString() + "\n",
                style: "subheader",
              },
            ],
            alignment: "right",
          },
        ],
      },
      {text: "DRE - Organiza Soft", style: "largeheader"},
      {
        table: {
          body: [
            [
              { text: "Categoria", style: "tableHeader" },
              { text: "Receitas", style: "tableHeader" },
              { text: "Despesas", style: "tableHeader" },
              { text: "%", style: "tableHeader" },
            ],
            ...data,
          ],
          headerRows: 1,
          widths: ["*", "25%", "25%", "auto"],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      largeheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 12,
        bold: false,
        margin: [0, 10, 0, 5],
      },
      tableHeader: {
        bold: true,
        fontSize: 11,
        color: "black",
      },
    },
  }
};
