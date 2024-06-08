import introJs from "intro.js";
import "intro.js/introjs.css";

const intro = introJs();
const defaultOptions = {
  exitOnEsc: true,
  exitOnOverlayClick: true,
  showBullets: false,
  showProgress: true,
  nextLabel: "Proximo",
  prevLabel: "Anterior",
  doneLabel: "Endendi 😉👍",
};
const initIntro = (coockie) => {
  intro.setOptions({
    ...defaultOptions,
    dontShowAgain: true,
    dontShowAgainLabel: "Não mostrar novamente",
    dontShowAgainCookie: coockie,
  });

  intro.start();
};
export { initIntro };
