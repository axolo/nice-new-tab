import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import Storage from './utils/storage'
import i18n from './utils/i18n'
import config from './config'

const app = createApp(App)

app.config.globalProperties.$storage = new Storage()
app.config.globalProperties.$i18n = i18n
app.config.globalProperties.$config = config

app.mount('#app')
