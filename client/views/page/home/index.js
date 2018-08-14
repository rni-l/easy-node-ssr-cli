import './index.scss'
import { init } from '@/core'

init()

if (module.hot) {
  module.hot.accept()
}
