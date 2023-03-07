<template>
    <div id="edit-pw">
        <h2>修改密码</h2>
        <el-input placeholder="请输入原密码" v-model="originPw" show-password clearable></el-input>
        <el-input placeholder="请输入新密码" v-model="newPw" show-password clearable></el-input>
        <el-input placeholder="请再次输入新密码" v-model="newPw2" show-password clearable></el-input>
        <p>提示:请输入三位以上的密码</p>
        <div class="btn-section">
            <el-button type="primary" @click="goTo('/user/profile')">资料主页</el-button>
            <el-button type="warning" @click="submitEdit">提交更新</el-button>
        </div>
    </div>
</template>
  
<script>
import { mapState } from 'vuex'
import { changeUserPw } from './../../../api/index'

export default {
    data() {
        return {
            originPw: '',
            newPw: '',
            newPw2: ''
        }
    },
    computed: {
        ...mapState(["userInfo"])
    },
    methods: {
        goTo(path) {
            this.$router.replace(path);
        },
        async submitEdit() {
            if (this.newPw.length < 3) {
                this.$notify.error({
                    title: '修改失败！',
                    message: '请输入正确的密码格式',
                    position: 'top-left'
                });
            } else {
                if (!this.newPw || !this.newPw2) {
                    this.$message('输入框内容不得为空！');
                    return;
                }
                if (this.newPw != this.newPw2) {
                    this.$message('两次输入的新密码不一致！');
                    return;
                }
                let result = await changeUserPw(this.userInfo.id, this.originPw, this.newPw);
                if (result.success_code === 200) {
                    this.$message({
                        message: result.message,
                        type: 'success'
                    });
                    this.$router.replace('/login');
                    this.$notify({
                        title: '修改密码成功！',
                        message: '请重新进行登录操作~',
                        type: 'success',
                        position: 'top-left'
                    });
                } else {
                    this.$message.error(result.message);
                    console.log(result)
                }

            }

        }
    }
}
</script>
  
<style scoped>
#edit-pw {
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
</style>
  