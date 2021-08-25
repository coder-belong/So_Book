import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$bus = new Vue()

// 引入组件库
import './pulgins/elementUI'

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
