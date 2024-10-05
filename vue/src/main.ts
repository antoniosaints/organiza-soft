import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import './assets/index.css';
import App from './App.vue';
import { Router } from './routes/Router';
import { createPinia } from 'pinia';
import IconsUtil from './utils/iconsUtil';

import pt from './locales/pt';
import en from './locales/en';
import { useMainStore } from './stores/mainStore';

const pinia = createPinia();
const app = createApp(App);
app.use(VueQueryPlugin)
app.use(pinia);

const bootstrap = useMainStore();
(async () => {
    await bootstrap.init();
})();

const i18n = createI18n({
    legacy: false,
    locale: 'pt',
    fallbackLocale: 'en',
    messages: {
        pt: pt as any, // Usando "as any" para resolver a tipagem
        en: en as any
    }
});

i18n.global.locale.value = <any>localStorage.getItem('gestaocliente:locale') || 'pt';

app.use(i18n);

app.use(Router);
app.component('IconFA', IconsUtil);
app.mount('#app');
