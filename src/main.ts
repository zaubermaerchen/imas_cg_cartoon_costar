import { createApp } from 'vue'
import vSelect from 'vue-select'
import App from '@/App.vue'

const app = createApp(App)
app.use(vSelect)
app.mount('#app')
