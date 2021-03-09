<template>
  <div class="alertD">
    <div><span style="color: red">当前app仅支持安卓手机</span></div>
    <div>打开手机浏览器输入{{ downLoadUrl }}</div>
    <div>
      (或者使用手机浏览器扫描下方二维码(<span style="color: red"
        >不支持直接使用微信扫码</span
      >)
    </div>
    <div class="imgBox">
      <img src="@/assets/ncgdjfAppSJZ.png" width="200" height="200" alt="" />
    </div>
    <div>
      或者先<a style="color: blue" :href="downLoadUrl">下载到电脑端</a
      >再发送到手机进行安装
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      downLoadUrl: 'http://110.249.159.162:9990/download/app-release.apk',
    }
  },
}
</script>

<style>
</style>