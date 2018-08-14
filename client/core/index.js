import Vue from 'vue'
import ElementUI from 'element-ui'
import store from '@/store/index'
import router from '../../common/router/types'
import uHeader from '@/components/header/Index.vue'
import uFooter from '@/components/footer/Index.vue'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.scss'
import { test } from '@/../common/api/goods'

console.log(test)

Vue.use(ElementUI)

const vueConfig = {
  el: '#app',
  store,
  components: {
    uHeader,
    uFooter
  }
}

Vue.prototype.vRouter = router
console.log(router)

export const init = (config = {}) => {
  if (config.components) {
    Object.keys(config.components).forEach(v => {
      vueConfig.components[v] = config.components[v]
    })
  }
  console.log(vueConfig)
  return new Vue(vueConfig)
}
