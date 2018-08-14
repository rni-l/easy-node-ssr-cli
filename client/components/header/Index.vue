<template>
  <header class="uv-header u-container">
    <div class="uv-header_wrap u-container_wrap">
      <!-- logo -->
      <a :href='rootPath' class='uv-header_logo' />
      <!-- 导航栏 -->
      <div class="uv-header_navi">
        <div :class="['uv-header_navi_item', activeName === v.path ? 'on' : '']"
          v-for='(v, i) in naviList' :key='i'>
          <!-- <router-link :to="v.to">{{ v.label }}</router-link> -->
          <a :href='v.path'>{{ v.label }}</a>
        </div>
      </div>
      <!-- 搜索栏 -->
      <u-search />
      <!-- 购物车 -->
      <u-cart />
      <!-- 头像 -->
      <u-avatar />
    </div>
  </header>
</template>

<script>
import uAvatar from './Avatar'
import uCart from './Cart'
import uSearch from './Search'
import ROUER_TYPE from '@/../common/router/types'

export default {
  name: 'u-header',

  components: {
    uAvatar,
    uCart,
    uSearch
  },

  data() {
    return {
      rootPath: ROUER_TYPE.HOME.path,
      naviList: [
        { label: '首页', path: ROUER_TYPE.HOME.path },
        { label: 'sdf', path: ROUER_TYPE.my.path }
      ],
      activeName: ''
    }
  },

  created() {
    this.checkRouter()
  },

  methods: {
    checkRouter() {
      const pathname = window.location.pathname
      if (pathname === '/') {
        this.activeName = '/'
        return false
      }
      const slice_name = pathname.substr(1)
      this.naviList.some(v => {
        const regexp = new RegExp(v.path)
        if (regexp.test(slice_name)) {
          this.activeName = v.path
          return true
        }
        return false
      })
      console.log(this.activeName)
    }
  }
}
</script>

<style lang="scss" >
.uv-header {
  background: #fff;
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.08);
  &_wrap {
    height: $header_h;
    @include f-verticalCenter;
  }
  &_logo {
    width: 121px;
    height: 50px;
    // background: url(../../assets/images/logo.png);
  }
  &_navi {
    color: #2D3237;
    @include f-verticalCenter;
    justify-content: space-between;
    padding: 0 120px 0 100px;
    min-width: 350px;
    &_item {
      &.on, &:hover {
        color: $c-primary;
      }
    }
  }
}
</style>
