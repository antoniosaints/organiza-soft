import { createApp } from 'vue'
import App from './App.vue'
import Router from './routes/Router.js'
import { createPinia } from 'pinia'
import "./pluguins/Fontawesome/IconsPluguin.js"
import './index.css'
import { useLoginStore } from './stores/login'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App);
app.use(createPinia());
app.use(VueApexCharts);
app.component('apexchart', VueApexCharts);

(async () => {
    await useLoginStore().checkToken();
})();

app.use(Router);
app.mount('#app');
