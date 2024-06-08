import httpService from "@/services/http";
import toast from "@/utils/toast";
import { defineStore } from "pinia";

export const radiusStore = defineStore("radius", () => {
    const getConnections = async () => {
        try {
            const {data} = await httpService("connections");
            return data;
        }catch (error) {
            toast.error(error.message, "Ops..");
        }
    }

    return {
        getConnections
    };

});
