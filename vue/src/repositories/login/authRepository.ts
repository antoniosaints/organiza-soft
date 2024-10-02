import axiosService from "../../services/http/axiosService";
import IUserLogin from "../../types/administracao/login/IUserLogin";

export default class AuthRepository {
    static async login(usuario: IUserLogin): Promise<any> {
        const { data } = await axiosService.post("auth", usuario);
        return data;
    }
    static async verify(): Promise<any> {
        const { data } = await axiosService.get(`auth/verify`);
        return data;
    }
    static async decode(): Promise<any> {
        const { data } = await axiosService.get(`auth/decode`);
        return data;
    }
}