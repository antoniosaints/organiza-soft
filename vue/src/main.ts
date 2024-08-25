import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import { Router } from './routes/Router';
import { createPinia } from 'pinia';
import { LoginService } from './services/login/loginService';
import IconsUtil from './utils/iconsUtil';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

(async () => {
    await LoginService.verify();
})();

app.use(Router);
app.component('IconFA', IconsUtil);
app.mount('#app');
