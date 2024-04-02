import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import '@/assets/styles/main.css'
import '@/assets/styles/tailwind.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(VueAxios, axios)

app.use(mdiVue, {
  icons: mdijs
})

app.provide('axios', app.config.globalProperties.axios) // provides axios for usage

app.mount('#app')
