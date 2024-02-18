<template>
  <div class="article-list" ref="ArticleList" @scroll="rememberScroll">
    <van-pull-refresh
     v-model="refreshing"
     @refresh="onRefresh"
   >
   <van-list
     v-model="loading"
     :error.sync="error"
     error-text="请求失败，点击重新加载"
     :finished="finished"
     finished-text="没有更多了"
     @load="onLoad()"
   > <article-item v-for="item in articles" :key="item.art_id" :article="item" />
   </van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './article-item.vue'
import { getArticlesByChannel } from '@/api/article.js'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },

  data () {
    return {
      timestamp: Date.now(),
      refreshing: false,
      // 文章列表
      articles: [],
      // 正在加载
      loading: false,
      // 是否加载错误
      error: false,
      // 数据全部加载完毕
      finished: false,
      // 阅读位置 (data中申明)
      scrollTop: 0,
      channelId: Math.floor(Math.random() * (3 - 0) + 1)

    }
  },
  methods: {
    // 下拉刷新
    async onRefresh () {
      // 发请求，获取数据，时间戳为当前
      const [err, res] = await getArticlesByChannel(this.channelId, Date.now())
      // 如果有错误
      if (err) {
        // 错误消息提示
        this.$toast.fail('刷新失败，请重试')
      // 否则 -> 请求成功
      } else {
        // 重置列表数据
        this.articles = res.data.data.results
        // 替换时间戳
        this.timestamp = res.data.data.pre_timestamp
        // 重置完成状态，可以再次加载更多
        this.finished = false
        // 成功消息提示
        this.$toast.success('刷新成功')
      }
      // 不管成功失败，都要结束刷新操作
      this.refreshing = false
    },
    // 上拉加载
    async onLoad () {
      // 发请求，获取数据
      const [err, res] = await getArticlesByChannel(this.channelId, this.timestamp)
      // 如果有错误
      if (err) {
        // 错误消息提示
        this.$toast.fail('加载失败，请重试')
        // 设置错误状态 -> 显示错误效果
        this.error = true
      // 否则 -> 请求成功
      } else {
        // 追加列表数据
        this.articles.push(...res.data.data.results)
        // 判断是否有下一页时间戳，若为空，也就没有更多了
        // 若有
        if (res.data.data.pre_timestamp) {
          // 记录下来，供下一页请求使用
          this.timestamp = res.data.data.pre_timestamp
        // 若没有
        } else {
          // 设置完成状态 -> 没有更多
          this.finished = true
        }
      }
      // 不管成功失败，都要结束加载操作
      this.loading = false
    },
    // 滚动监听
    rememberScroll () {
      this.scrollTop = this.$refs.ArticleList.scrollTop
    }
  },
  // 激活组件钩子
  activated () {
    this.$refs.ArticleList.scrollTop = this.scrollTop
  }
}
</script>
