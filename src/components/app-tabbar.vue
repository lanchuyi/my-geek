<template>
    <van-tabbar :border="false" route>
      <van-tabbar-item to="/">
        <template #icon="props">
          <i class="iconfont" :class="[props.active ? 'icon-home-sel' : 'icon-home']" />
        </template>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/question">
        <template #icon="props">
          <i class="iconfont" :class="[props.active ? 'icon-qa-sel' : 'icon-qa']" />
        </template>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon="props">
          <i class="iconfont" :class="[props.active ? 'icon-video-sel' : 'icon-video']" />
        </template>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        <template #icon="props">
          <i class="iconfont" :class="[props.active ? 'icon-mine-sel' : 'icon-mine']" />
        </template>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </template>

<script>

export default {
  name: 'GeekTabbar'

}
</script>

  <style scoped lang="less">
  .van-tabbar {
    background: @geek-gray-color;
  position: static;
  }
  ::v-deep .van-tabbar-item--active {
    color: @geek-color;
  background-color: @geek-gray-color;
  }
  ::v-deep .van-tabbar-item__icon {
    font-size: 20px;
  }
  ::v-deep .van-tabbar-item__text {
    font-size: 10px;
  }
  </style>
