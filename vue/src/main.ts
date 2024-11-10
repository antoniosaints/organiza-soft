import './assets/index.css';
import '@vuepic/vue-datepicker/dist/main.css'
import App from './App.vue';
import IconsUtil from './utils/iconsUtil';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useMainStore } from './stores/mainStore';
import { VueQueryPlugin } from '@tanstack/vue-query'
import { Router } from './routes/Router';
import { i18n } from './i18n';
import VueDatePicker from '@vuepic/vue-datepicker';
import './assets/datepicker.css';

const pinia = createPinia();
const app = createApp(App);

app.use(VueQueryPlugin)
app.use(pinia);

(async () => await useMainStore().init())();

app.use(i18n);
app.use(Router);
app.component('IconFA', IconsUtil);
app.component('VueDatePicker', VueDatePicker);
app.mount('#app');
