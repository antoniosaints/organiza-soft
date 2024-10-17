import './assets/index.css';
import App from './App.vue';
import IconsUtil from './utils/iconsUtil';
import pt from './locales/pt';
import en from './locales/en';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useMainStore } from './stores/mainStore';
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createI18n } from 'vue-i18n';
import { Router } from './routes/Router';

const pinia = createPinia();
const app = createApp(App);

app.use(VueQueryPlugin)
app.use(pinia);

(async () => {
    await useMainStore().init();
})();

const i18n = createI18n({
    legacy: false,
    locale: 'pt',
    fallbackLocale: 'en',
    messages: {
        pt: pt as any,
        en: en as any
    }
});

i18n.global.locale.value = <any>localStorage.getItem('gestaocliente:locale') || 'pt';

app.use(i18n);
app.use(Router);
app.component('IconFA', IconsUtil);
app.mount('#app');
