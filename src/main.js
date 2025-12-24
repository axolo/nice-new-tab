import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import i18n from './utils/i18n'
import Settings from './utils/settings'

const app = createApp(App)

app.config.globalProperties.$i18n = i18n
app.config.globalProperties.$settings = new Settings()

app.mount('#app')
