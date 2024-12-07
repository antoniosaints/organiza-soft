import { TDocumentDefinitions } from "pdfmake/interfaces";

export const DefRelatorioGeralFinanceiro: TDocumentDefinitions = {
    language: "pt-br",
    header: {
        columns: [
            {
                text: "Relatório Financeiro",
                alignment: "center",
                fontSize: 18,
                bold: true,
                margin: [0, 10, 0, 10]
            }
        ]
    },
    pageSize: "A4",
    pageOrientation: "portrait",
    content: [
        {
            text: "Resumo dos lançamentos do ano",
            style: "header_two"
        },
        {
            text: "Data: " + new Date().toLocaleDateString(),
            style: "subheader"
        },
        {
            table: {
                body: [
                    [
                        {
                            text: "Produto",
                            style: "tableHeader"
                        },
                        {
                            text: "Quantidade",
                            style: "tableHeader"
                        },
                        {
                            text: "Preço",
                            style: "tableHeader"
                        }
                    ],
                    [
                        "Produto 1",
                        "10",
                        "R$ 100,00"
                    ],
                    [
                        "Produto 2",
                        "5",
                        "R$ 50,00"
                    ]
                ],
                headerRows: 1,
                widths: ["*", "*", "*"]
            },
        }
    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
        },
        header_two: {
            fontSize: 14,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: "center"
        },
        subheader: {
            fontSize: 12,
            bold: true,
            margin: [0, 10, 0, 5]
        },
        tableHeader: {
            bold: true,
            fontSize: 11,
            color: "black"
        }
    }
}