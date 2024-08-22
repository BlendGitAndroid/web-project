import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'  // 安装normalize.css，引入预定义的全局样式
import './style/index.scss' // 引入全局样式
createApp(App).use(router).use(store).mount('#app')
