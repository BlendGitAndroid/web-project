import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// #app是index.html中的一个div元素，index.html文件在public文件夹中
createApp(App).use(store).use(router).mount('#app')
