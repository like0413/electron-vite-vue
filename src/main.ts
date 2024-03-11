import { createApp } from 'vue'
import { Layout, Menu, Button, Select, Checkbox } from 'ant-design-vue'
import App from './App.vue'
import router from './router'

import './style.css'

const app = createApp(App)

app.use(Layout)
app.use(Menu)
app.use(Button)
app.use(Select)
app.use(Checkbox)

app.use(router)

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
