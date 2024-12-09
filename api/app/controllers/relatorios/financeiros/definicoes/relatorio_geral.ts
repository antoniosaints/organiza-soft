import { TDocumentDefinitions } from "pdfmake/interfaces";
import { imageProfile } from "../configs/profile";
import { relatorioVendasMensal } from "../data/relatorio_vendas_mensal";

export const DefRelatorioGeralFinanceiro: TDocumentDefinitions = {
  language: "pt-br",
  pageSize: "A4",
  pageOrientation: "portrait",
//   watermark: {
//     text: "CAS Telecomunicações Eireli",
//     opacity: 0.1,
//   },
  ownerPassword: "123",
  permissions: {
        annotating: true,
        contentAccessibility: true,
        copying: false,
        modifying: false,
        fillingForms: false,
        printing: "highResolution",
        documentAssembly: false,
  },
  info: {
      author: "CAS Telecomunicações Eireli",
      creator: "Antonio Costa dos Santos",
      title: "Relatório Financeiro",
      subject: "Relatório Financeiro",
      creationDate: new Date(),
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
            { text: "CAS Telecomunicações Eireli\n", style: "header" },
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
    {
      table: {
        body: [
          [
            {
              text: "Produto",
              style: "tableHeader",
            },
            {
              text: "Quantidade",
              style: "tableHeader",
            },
            {
              text: "Preço",
              style: "tableHeader",
            },
            {
              text: "Total",
              style: "tableHeader",
            },
          ],
          ...relatorioVendasMensal
        ],
        headerRows: 1,
        widths: ["*", "*", "*", "*"],
      },
    },
  ],
  styles: {
    header: {
      fontSize: 18,
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
