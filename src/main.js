import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './assets/index.css'
import router from './router/router'
import VueCookies from 'vue3-cookies';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown,faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleDown)
library.add(faAngleUp)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueCookies)
app.use(router)
app.use(store)
app.mount('#app')
