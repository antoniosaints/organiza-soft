import { useLoginStore } from "@/stores/login/loginStore";
import { Router } from "../Router";
const loginstore = useLoginStore();

Router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("@gestao_inteligente:token"))
      next({ name: "Login" });
    else {
      if (from.name === "Login") next();
      else {
        if (!loginstore.isAutenticated) next({ name: "Login" });
        else next();
      }
    }
  } else next();
});
