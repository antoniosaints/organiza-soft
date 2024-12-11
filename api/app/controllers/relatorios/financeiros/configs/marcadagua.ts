import { Watermark } from "pdfmake/interfaces";
import { IQueryParams } from "../dtos/IQueryParams";

export const marcaDaguaPdf = (query: IQueryParams, marca: string = "Organiza Soft"): Watermark | undefined => {
    const resultado = query.marca === "sim"
    ? { text: marca, opacity: 0.1, bold: true }
    : undefined

    return resultado
}