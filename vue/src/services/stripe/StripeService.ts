import toastUtil from "@/utils/toastUtil";
import axiosService from "../http/axiosService";

export const createCheckoutSession = async (customerId: string) => {
    try {
        const session = await axiosService.post("stripe/create-checkout-session", {
            customerId
        });
        return session
    } catch (error) {
        console.log(error)
        toastUtil.error("Erro ao criar checkout de assinatura", "Ops..");
    }
};
export const createPortalCaptive = async (customerId: string) => {
    try {
        const session: any = await axiosService.post("stripe/create-customer-portal", {
            customerId
        });
        return session
    } catch (error) {
        console.log(error)
        toastUtil.error("Erro ao criar o portal do assinante", "Ops..");
    }
};