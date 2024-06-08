import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const user_permission = ref(null);
    const isAdmin = ref(false);
    const verifyPermission = () => {
        if (user_permission.value) {
            isAdmin.value = user_permission.value.includes("admin");
        }
    }

    return {
        user_permission,
        verifyPermission,
        isAdmin
    };

});
