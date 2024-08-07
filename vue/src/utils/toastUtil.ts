import iziToast, { IziToastSettings } from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const defaultOption: IziToastSettings = {
    position: "topRight",
    timeout: 5000,
    close: true,
    theme: "dark",
    zindex: 999,
    resetOnHover: true,
    progressBar: true,
    closeOnClick: true,
    titleColor: "#fff",
    iconColor: "#fff",
    messageColor: "#fff",
    progressBarColor: "#fff",
};

const success = (message: string, title: string) => {
    iziToast.success({
        ...defaultOption,
        backgroundColor: "#038220",
        title,
        message,
    });
};

const error = (message: string, title: string) => {
    iziToast.error({
        ...defaultOption,
        backgroundColor: "#f00",
        title,
        message,
    });
};

const info = (message: string, title: string) => {
    iziToast.info({
        ...defaultOption,
        backgroundColor: "#037382",
        title,
        message,
    });
};

const warning = (message: string, title: string) => {
    iziToast.warning({
        ...defaultOption,
        backgroundColor: "#9e4a00",
        title,
        message,
    });
};


export default { success, error, info, warning };
