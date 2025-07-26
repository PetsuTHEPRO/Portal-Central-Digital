import { createApp } from 'vue'
import { createPinia } from 'pinia' // Importe
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)

app.use(createPinia()) // Use a Pinia
app.use(router)

app.mount('#app')
