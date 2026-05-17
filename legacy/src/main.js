import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDrum, faPlus, faGuitar, faHammer } from '@fortawesome/free-solid-svg-icons'
import '@/styles/colors.css'; 

library.add(faDrum, faPlus, faGuitar, faHammer)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(store)

app.mount('#app')