import { createApp } from 'vue'
import './assets/main.scss'
import App from './App.vue'
import { router } from './routes'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
app.use(VueQueryPlugin)
app.use(router)
app.mount('#app')
