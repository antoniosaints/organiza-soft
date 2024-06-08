import { createApp } from 'vue'
import App from './App.vue'
import Router from './routes/Router.js'
import { createPinia } from 'pinia'
import "./pluguins/Fontawesome/IconsPluguin.js"
import './index.css'
import { useLoginStore } from './stores/login'

const app = createApp(App);
app.use(createPinia());

(async () => {
    await useLoginStore().checkToken();
})();

app.use(Router);
app.mount('#app');
