import { IQueryParams } from "../dtos/IQueryParams"

export const defaultPermissions = (query: IQueryParams): PDFKit.DocumentPermissions => {
    return {
        annotating: query.comentarios === "sim",
        contentAccessibility: query.editavel === "sim",
        copying: query.editavel === "sim",
        modifying: query.editavel === "sim",
        fillingForms: query.editavel === "sim",
        printing: query.print === "sim" ? "highResolution" : undefined,
        documentAssembly: true
    }
}