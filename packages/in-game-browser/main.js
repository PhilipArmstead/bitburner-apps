import App from './App.vue'
import { createApp } from 'vue'
import { id } from './config/app'

createApp(App).mount(`#${id}`)
