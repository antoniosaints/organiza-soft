import { createApp } from "vue";
import App from "./App.vue";
import Router from "./routes/Router.js";
import { createPinia } from "pinia";
import "./pluguins/Fontawesome/IconsPluguin.js";
import "./index.css";
import { useLoginStore } from "./stores/login";
import CookieUtil from "./utils/cookie";

const app = createApp(App);
app.use(createPinia());

Router.beforeEach(async (to, from, next) => {
  const isAutenticated = !!CookieUtil.getCookie("@gestao_inteligente:token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAutenticated) {
      next("/login");
    } else {
      const data = await useLoginStore().checkToken();

      if (data.status != "success") {
        CookieUtil.deleteCookie("@gestao_inteligente:token");
        next("/login");
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

app.use(Router);
app.mount("#app");
