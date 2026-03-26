import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'        
import PrimeVue from 'primevue/config';


const app = createApp(App)

app.use(PrimeVue);

app.use(router)

app.mount('#app')
