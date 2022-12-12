<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  components: {

  },
  mounted() {
    //存储用户信息，防止强制刷新带来的数据丢失
    /**
     * 注意：
     * 刷新页面vuex的数据会丢失属于正常现象，(vuex的数据并不是弄丢了，而是初始化了，回到初始值，回到原点了).因为JS的数据都是保存在浏览器的堆栈内存里面的，
     * 刷新浏览器页面，以前堆栈申请的内存被释放，这就是浏览器的运行机制，那么堆栈里的数据自然就清空了。
     */
    let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    if (userInfo) {
      this.syncUserInfo(userInfo);
    }
  },

  methods: {
    ...mapActions(['syncUserInfo']),
  },

  // created() {
  //   // 在页面加载时读取sessionStorage
  //   if (sessionStorage.getItem('store')) {
  //     this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
  //   }
  //   // 在页面刷新时将store保存到sessionStorage里
  //   window.addEventListener('beforeunload', () => {
  //     sessionStorage.setItem('store', JSON.stringify(this.$store.state))
  //   })
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*字体渲染 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
