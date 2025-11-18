import { createApp } from 'vue'
import { createPinia } from 'pinia'

import HomeView from './views/HomeView.vue'
import router from './router'

const app = createApp(HomeView)

app.use(createPinia())
app.use(router)

app.mount('#app')
