import 'es6-promise/auto'
import 'babel-polyfill'
import Vue from 'vue'
// import {} from 'element-ui'
// import { Pagination, Dialog, Autocomplete, Dropdown, DropdownMenu, DropdownItem, Menu, Submenu, MenuItem, MenuItemGroup, Input, InputNumber, Radio, RadioGroup, RadioButton, Checkbox, CheckboxButton, CheckboxGroup, Switch, Select, Option, OptionGroup, Button, ButtonGroup, Table, TableColumn, DatePicker, TimeSelect, TimePicker, Popover, Tooltip, Breadcrumb, BreadcrumbItem, Form, FormItem, Tabs, TabPane, Tag, Tree, Alert, Slider, Icon, Row, Col, Upload, Progress, Badge, Card, Rate, Steps, Step, Carousel, CarouselItem, Collapse, CollapseItem, Cascader, ColorPicker
// } from 'element-ui'
import store from '@/store/index'
import router from '../../common/router/types'
import uHeader from '@/components/header/Index.vue'
import uFooter from '@/components/footer/Index.vue'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.scss'

// Vue.use(ElementUI)

// Vue.component('elPagination', Pagination)
// Vue.component('elDialog', Dialog)
// Vue.component('elAutocomplete', Autocomplete)
// Vue.component('elDropdown', Dropdown)
// Vue.component('elDropdownMenu', DropdownMenu)
// Vue.component('elDropdownItem', DropdownItem)
// Vue.component('elMenu', Menu)
// Vue.component('elSubmenu', Submenu)
// Vue.component('elMenuItem', MenuItem)
// Vue.component('elMenuItemGroup', MenuItemGroup)
// Vue.component('elInput', Input)
// Vue.component('elInputNumber', InputNumber)
// Vue.component('elRadio', Radio)
// Vue.component('elRadioGroup', RadioGroup)
// Vue.component('elRadioButton', RadioButton)
// Vue.component('elCheckbox', Checkbox)
// Vue.component('elCheckboxButton', CheckboxButton)
// Vue.component('elCheckboxGroup', CheckboxGroup)
// Vue.component('elSwitch', Switch)
// Vue.component('elSelect', Select)
// Vue.component('elOption', Option)
// Vue.component('elOptionGroup', OptionGroup)
// Vue.component('elButton', Button)
// Vue.component('elButtonGroup', ButtonGroup)
// Vue.component('elTable', Table)
// Vue.component('elTableColumn', TableColumn)
// Vue.component('elDatePicker', DatePicker)
// Vue.component('elTimeSelect', TimeSelect)
// Vue.component('elTimePicker', TimePicker)
// Vue.component('elPopover', Popover)
// Vue.component('elTooltip', Tooltip)
// Vue.component('elBreadcrumb', Breadcrumb)
// Vue.component('elBreadcrumbItem', BreadcrumbItem)
// Vue.component('elForm', Form)
// Vue.component('elFormItem', FormItem)
// Vue.component('elTabs', Tabs)
// Vue.component('elTabPane', TabPane)
// Vue.component('elTag', Tag)
// Vue.component('elTree', Tree)
// Vue.component('elAlert', Alert)
// Vue.component('elSlider', Slider)
// Vue.component('elIcon', Icon)
// Vue.component('elRow', Row)
// Vue.component('elCol', Col)
// Vue.component('elUpload', Upload)
// Vue.component('elProgress', Progress)
// Vue.component('elBadge', Badge)
// Vue.component('elCard', Card)
// Vue.component('elRate', Rate)
// Vue.component('elSteps', Steps)
// Vue.component('elStep', Step)
// Vue.component('elCarousel', Carousel)
// Vue.component('elCarouselItem', CarouselItem)
// Vue.component('elCollapse', Collapse)
// Vue.component('elCollapseItem', CollapseItem)
// Vue.component('elCascader', Cascader)
// Vue.component('elColorPicker', ColorPicker)

const vueConfig = {
  el: '#app',
  store,
  mixins: [],
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
  // components
  // mixin
  Object.keys(config).forEach(key => {
    const value = config[key]
    const valueType = Object.prototype.toString.call(value)
    if (valueType === '[object Object]') {
      Object.keys(value).forEach(configValueKey => {
        vueConfig[key] = {
          ...vueConfig[key],
          configValueKey: value[configValueKey]
        }
      })
    } else if (valueType === '[object Array]') {
      value.forEach(valueItem => {
        vueConfig[key].push(valueItem)
      })
    } else {
      vueConfig[key] = value
    }
  })
  console.log(vueConfig)
  return new Vue(vueConfig)
}
