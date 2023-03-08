<template>
    <div id="user_recharge">

        <h2>充值中心</h2>
        <el-input placeholder="请输入充值金额(单次充值额度最低10￥)" v-model="chargeNum" type="number"></el-input>
        <p>提示:充值过程约需3秒，请耐心等待，充值后请查验余额</p>
        <div class="btn-section">
            <el-button type="primary" @click="goTo('/user/balance')">查看余额</el-button>
            <el-button type="success" @click="submitCharge">点击充值</el-button>
        </div>

    </div>
</template>

<script>

import { mapState } from 'vuex'
import { recharge } from '../../../api'
export default {
    data() {
        return {
            chargeNum: null,

        }
    },
    computed: {
        ...mapState(["userInfo"])
    },
    methods: {
        goTo(path) {
            this.$router.replace(path)
        },
        async submitCharge() {
            if (this.chargeNum < 10) {
                this.$message({
                    type: 'warning',
                    message: '充值金额低于10￥'
                })
            } else {
                let result = await recharge(this.userInfo.id, this.userInfo.user_balance, this.chargeNum)
                if (result.success_code === 200) {
                    setTimeout(() => {
                        this.$message({
                            type: 'success',
                            message: '充值成功！'
                        });
                    }, 3000);
                    //更新本地用户数据
                    this.$store.dispatch('getUserInfo', { user_id: this.userInfo.id })
                    this.chargeNum = null
                } else {
                    this.$message.error(result.message);
                    console.log(result)
                }
            }
        }
    },
}
</script>

<style scoped lang="less">
#user_recharge {

    padding-top: 6%;
    width: 100%;
    height: 100%;

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
        width: 90%;
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

}
</style>