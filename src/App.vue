<template>
  <div id="app">
    <keep-alive include="HomePage">
    <RouterView class="body" />
  </keep-alive>
    <RouterView class="footer" name="tabbar" />

  </div>
</template>
<style lang="less" scoped>
#app {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .body {
    flex: 1;
    overflow: hidden;
  }
  .footer {
    height: 50px;
  }
}
</style>
