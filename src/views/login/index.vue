<template>
    <div class="login-page">
      <div class="back">
        <!-- $router.back() 返回上一次访问路由，forward go -->
        <i class="iconfont icon-esay-close" @click="$router.back()"></i>
      </div>
      <h3 class="title">短信登录</h3>
      <!-- 表单 -->
      <van-form class="form" ref="form">
        <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="form.mobile"
        :rules="rules.mobile"
      ></van-field>
      <van-field
        placeholder="请输入验证码"
        v-model="form.code"
        :rules="rules.code"
      >
      <template #button>
          <span @click="send" class="send">
            {{ second === 0 ? '发送验证码' : `${second}秒后发送` }}
          </span>
        </template>
    </van-field>
      </van-form>
      <van-button @click="login">登录</van-button>
    </div>
  </template>

<script>
import { userLogin, sendMessage } from '@/api/user'
// import { setToken } from '@/utils/storage'
export default {

  name: 'LoginPage',
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不对' }
        ],
        code: [
          { required: true, message: '请输入手机号' },
          { pattern: /^\d{6}$/, message: '验证码是6个数字' }
        ]
      },
      // 倒计时秒数
      second: 0
    }
  },
  methods: {
    async login () {
      // 校验
      await this.$refs.form.validate()
      // 登录
      const [err, res] = await userLogin(this.form)
      // 失败
      if (err) return this.$toast.fail('登录失败')
      // 成功
      // 保存token
      //   setToken(res.data.data.token)
      this.$store.commit('setToken', res.data.data.token)
      // 如果有回跳地址
      if (this.$route.query.returnUrl) {
        // 直接后退
        this.$router.back()
      // 没有回跳地址，去首页
      } else {
        this.$router.push('/')
      }
    },
    async send () {
      // 已发送，不做事
      if (this.second > 0) return
      // 校验手机号
      await this.$refs.form.validate('mobile')
      // 发短信
      const [err] = await sendMessage(this.form.mobile)
      // 失败
      if (err) return this.$toast.fail('发送失败')
      // 成功 倒计时
      this.second = 60
      if (this.timer) clearInterval(this.timer)
      // 存储定时器ID，这个数据不参与视图渲染，所以不需要事先在data中定义
      this.timer = setInterval(() => {
        this.second--
        if (this.second <= 0) clearInterval(this.timer)
      }, 1000)
    },
    beforeDestroy () {
      if (this.timer) clearInterval(this.timer)
    }
  }
}
</script>

  <style scoped lang="less">
  .login-page {
    padding: 0 32px;
    .back {
      height: 60px;
      display: flex;
      align-items: center;
      .icon-esay-close {
        font-size: 20px;
        color: #ccc;
        position: relative;
        left: -15px;
      }
    }
    .title {
      font-size: 22px;
      line-height: 1;
      padding: 30px 0;
    }
    .van-cell {
      padding: 20px 0;
      &::after {
        left: 0;
        right: 0;
      }
    }
    .van-button {
      width: 100%;
      margin-top: 40px;
      height: 50px;
      color: #fff;
      font-size: 16px;
      border: none;
      background: linear-gradient(to right, #FF9999, #FFA179);
    }
    .send {
    font-size: 12px;
    color: #A5A6AB;
  }
  }
  </style>
