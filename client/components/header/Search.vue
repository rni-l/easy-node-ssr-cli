<template>
  <div class='uv-header_search'>
    <div class="uv-header_search_left">
      <p>商品</p>
    </div>

    <input type="text" v-model.trim='content'
      placeholder="搜索商品名称"
      class='uv-header_search_content'>

    <button class="uv-header_search_right uv-btn primary">搜索</button>
  </div>
</template>

<script>
export default {
  name: 'u-header_search',

  data() {
    return {
      content: ''
    }
  },

  methods: {}
}
</script>

<style lang='scss'>
$w: 360px;
$h: 32px;
$w_left: 78px;
$w_right: 80px;
.uv-header_search {
  width: $w;
  height: $h;
  border-radius: 100px;
  border: solid 1px $c-border;
  @include f-verticalCenter;

  &_left {
    width: $w_left;
    position: relative;
    color: $c-title;
    padding-left: 22px;
    box-sizing: border-box;
    &::after {
      content: '';
      display: block;
      width: 2px;
      height: 12px;
      @include f-absoluteColumnCenter;
      right: 0;
      background: $c-border;
    }
    p {
      padding-right: 26.5px;
    }
  }

  &_content {
    flex: 1;
    color: c-title;
    padding-left: 12px;
    &:placeholder {
      color: $c-desc;
    }
  }

  &_right {
    width: $w_right;
    height: 32px;
    border-radius: 0 21px 21px 0;
  }
}
</style>
