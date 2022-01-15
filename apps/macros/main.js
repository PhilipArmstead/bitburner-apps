import App from './App.vue'
import { createApp } from 'vue'
import config from './config/app'

createApp(App, config).mount(`#${config.id}`)
