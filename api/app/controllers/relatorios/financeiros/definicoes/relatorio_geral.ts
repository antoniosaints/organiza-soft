import { TDocumentDefinitions } from "pdfmake/interfaces";
import { imageProfile } from "../configs/profile";
import { relatorioVendasMensal } from "../data/relatorio_vendas_mensal";
import { defaultPermissions } from "../configs/permissions";
import { IQueryParams } from "../dtos/IQueryParams";
import { Request } from "express";
import { getdataConta } from "./relatorio_geral_data";
import { informacoesPdf } from "../configs/infos";
import { marcaDaguaPdf } from "../configs/marcadagua";

export const DefRelatorioGeralFinanceiro = async (request: Request): Promise<TDocumentDefinitions> => {
  const query: IQueryParams = request.query;
  const data = await relatorioVendasMensal(request);
  const dataConta = await getdataConta(request);
  const dataGerado = new Date().toLocaleDateString();
  return {
    language: "pt-br",
    version: "1.3",
    pageSize: "A4",
    watermark: marcaDaguaPdf(query),
    pageOrientation: "portrait",
    ownerPassword: "123",
    permissions: defaultPermissions(query),
    info: informacoesPdf("DRE financeiro - organizasoft"),
    content: [
      {
        marginBottom: 20,
        columns: [
          {
            text: [
              {
                text: `${dataConta ? dataConta.conta : "Organiza Soft"}\n`,
                style: "header",
              },
              {
                text: `Contato: ${dataConta && dataConta.telefone ? dataConta.telefone : "Sem contato"}\n`,
                style: "subheader",
              },
              {
                text: `E-mail: ${dataConta && dataConta.email ? dataConta.email : "Sem email vinculado"}\n`,
                style: "subheader",
              },
              {
                text: `Criado em: ${dataGerado}\n`,
                style: "subheader",
              },
            ],
            alignment: "left",
          },
          {
            image: imageProfile,
            width: 55,
            height: 55,
            alignment: "right",
          },
        ],
      },
      {
        text: "DRE - Demonstração do resultado do exercício",
        style: "largeheader",
      },
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
        fontSize: 14,
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
  };
};
