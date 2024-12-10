import axiosService from "../../services/http/axiosService";
export default class FinanceiroRelatorioRepository {
    static async gerarRelatorioDre(): Promise<any> {
        const response = await axiosService.get("relatorios/financeiros?print=sim", {
            responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "relatorio.pdf");
        document.body.appendChild(link);
        link.click();
    }
}