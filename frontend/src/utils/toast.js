import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const defaultOption = {
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

const success = (message, title) => {
  iziToast.success({
    ...defaultOption,
    backgroundColor: "#038220",
    title,
    message,
  });
};

const error = (message, title) => {
  iziToast.error({
    ...defaultOption,
    backgroundColor: "#f00",
    title,
    message,
  });
};

const info = (message, title) => {
  iziToast.info({
    ...defaultOption,
    backgroundColor: "#037382",
    title,
    message,
  });
};

const warning = (message, title) => {
  iziToast.warning({
    ...defaultOption,
    backgroundColor: "#9e4a00",
    title,
    message,
  });
};

export default { success, error, info, warning };
