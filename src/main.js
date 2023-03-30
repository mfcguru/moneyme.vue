import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import LogoComponent from './components/LogoComponent'

createApp(App)
  .use(router)
  .component('LogoComponent', LogoComponent)
  .mount('#app')
