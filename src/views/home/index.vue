<template>
    <div class="home-page">
    <van-tabs animated>
      <van-tab :key="item.id" v-for="item in myChannels" :title="item.name">
        <article-list :channelId="item.id"></article-list>
      </van-tab>
    </van-tabs>
    </div>
  </template>
<script>
// import { getAllChannels } from '@/api/channel'
import { getMyChannels } from '@/store/modules/channel'
import ArticleList from '@/components/article-list.vue'
export default {
  name: 'HomePage',
  props: {
    channelId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      myChannels: []
    }
  },
  async created () {
    const [err, res] = await getMyChannels()
    if (err) return this.$toast.fail('频道获取失败')
    this.myChannels = res.data.data.channels
  },
  // async created () {
  //   // 通过数组解构语法提取err和res，如果err为null说明没有异常
  //   const [err, res] = await getAllChannels()
  //   if (err) return console.log('失败', err.message)
  //   console.log('成功', res.data)
  // }
  components: { ArticleList }
}

</script>
  <style scoped lang="less">
 .home-page {
  ::v-deep .van-tabs {
    height: 100%;
  display: flex;
   flex-direction: column;
    .van-tabs__line {
      background: @geek-color;
      height: 2px;
      width: 32px;
    }
    .van-tab {
      color: #9ea1ae;
    }
    .van-tab--active {
      font-size: 18px;
      color: #333;
    }
    .van-tabs__wrap {
      padding-right: 86px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .van-tabs__content {
      flex: 1;
      overflow: hidden;
   }
   .van-tab__pane {
      height: 100%;
   }
}
 }
</style>
