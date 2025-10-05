import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importa primero el CSS de Bootstrap para que los estilos estén disponibles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import './views/style.css';

const app = createApp(App)

app.use(router)

app.mount('#app')


