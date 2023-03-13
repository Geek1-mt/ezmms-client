<template>
    <div id="my-balance">
        用户：<span>{{ userInfo.user_name || '暂无' }}</span>
        <br><br><br>
        您当前账户余额为：<span style="font-style:italic">{{ userInfo.user_balance / 100.0 || '暂无' }}￥</span>
        <br><br>
        <p>提示:新用户默认余额为20￥</p>
        <div class="btn-section">
            <el-button type="primary" @click="goTo('/home')">返回商城</el-button>
            <el-button type="success" @click="goTo('/user/rechargecenter')">前往充值</el-button>
        </div>
    </div>
</template>
  
<script>
import { mapState } from 'vuex'


export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState(["userInfo"])
    },
    methods: {
        goTo(path) {
            this.$router.replace(path);
        }
    }
}

</script>
  
<style scoped>
#my-balance {
    padding-top: 6%;
    width: 100%;
    height: 100%;
}

.el-input {
    display: block;
    margin: 0 auto 20px;
    width: 28%;
}

h2 {
    position: relative;
    left: -100px;
    margin-bottom: 40px;

}

p {
    margin-top: 30px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.btn-section {
    margin: 50px auto;
    width: 25%;
    display: flex;
    justify-content: space-around;
}

.btn-section .el-button {
    width: 100px;
    outline: none;
}

span {
    font-weight: bold;
}
</style>
  