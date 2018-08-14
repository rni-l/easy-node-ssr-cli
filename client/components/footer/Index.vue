<template>
  <footer class='uv-footer'>
    <div class="uv-footer_top">
      <div class="uv-footer_top_wrap"></div>
    </div>

    <div class="uv-footer_bottom">
      <div class="uv-footer_bottom_wrap">
        footer.......
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'u-footer'
  }
</script>

<style lang='scss'>
$t_h: 262px;

.uv-footer {
  height: $footer_h;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  &_top {
    background: $c-footerBg;
    min-height: $t_h;
    &_wrap {
      width: $content_w;
      margin: 0 auto;
    }
  }

  &_bottom {
    &_wrap {
      margin: 0 auto;
      width: $content_w;
    }
  }
}
</style>
