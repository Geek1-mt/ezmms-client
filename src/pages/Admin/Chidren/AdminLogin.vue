<template>
    <div class="container">
        <div id="main">
            <div class="login">
                <h1>管理员通道</h1>
                <!-- <h2>登录/注册</h2> -->
                <el-tabs type="border-card" class="login-tabs" stretch>

                    <el-tab-pane label="管理员登录" name="">
                        <el-form ref="loginForm" :model="loginForm" status-icon :rules="rules" class="login-Form">
                            <el-form-item label="用户名" prop="username">
                                <el-input type="text" v-model="loginForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="loginForm.password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('loginForm')">点击登录</el-button>
                                <el-button type="info" @click="$router.replace('/home')">返回商店</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>
    </div>
</template>
  
<script>
// 引入登录、注册等网络请求
//import api from '../api'

import { mapActions, mapMutations } from "vuex"
import { mapState } from "vuex"
import { adminLogin } from '../../../api'


export default {


    data() {
        //具体验证规则
        var validateUserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error("请输入用户名"))
            }
            callback()
        }

        var validatePassWord = (rule, value, callback) => {
            if (value === '') {
                callback(new Error("请输入密码"))
            } else if (value.length < 3) {
                callback(new Error("密码长度不够"))
            }
            callback()
        }

        return {
            currentIndex: "login",
            loginForm: {
                username: '',
                password: '',
            },
            activeTab: "",
            adminInfo: {}, //用户信息
            //验证规则
            rules: {
                username: [{ validator: validateUserName, trigger: 'blur' }],
                password: [{ validator: validatePassWord, trigger: 'blur' }],
            }
        }
    },
    methods: {
        ...mapActions(['syncUserInfo']),
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.activeTab === "") {
                        //console.log(this.loginForm)
                        //发送登录请求
                        const result = await adminLogin(this.loginForm.username, this.loginForm.password)
                        //console.log(result)
                        //状态码判断
                        if (result.success_code === 200) {
                            this.userInfo = result.message;
                            this.loginForm.password = ''; // 密码
                            this.loginForm.username = ''; // 账号
                            this.$notify({
                                title: '成功',
                                message: '管理员登录成功！',
                                type: 'success',
                                position: 'top-left'
                            });
                            this.$router.push('/admin')

                            this.adminInfo.user_name = this.loginForm.username
                            this.$router.replace('/admin');
                            window.localStorage.setItem("adminInfo", JSON.stringify(this.adminInfo));
                            //window.localStorage.removeItem("userInfo");

                        } else {
                            this.$notify.error({
                                title: '登录失败',
                                message: '用户名或密码错误',
                                type: 'error',
                                position: 'top-left'
                            });
                            console.log(result)
                        }
                    }
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleTabsClick(tab) {
            //console.log(tab.name)
            this.activeTab = tab.name
        }
    },
}
</script>
  
<style scoped lang="less">
h1 {
    margin-top: 50px;
    color: rgb(61, 57, 179);
    font-family: STFangsong
}

.container {
    width: 100%;
    background: #f2f2f2;
    height: 100%;
    display: flex;
    flex-direction: column;

    #main {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        box-sizing: border-box;
    }
}

.login {

    margin-top: 0px;
    // background: url("../../../public/LoginBack.jpg");
    background-repeat: no-repeat; //将图片样式不重复
    background-size: 100% 100%; //设置图片大小
    position: fixed;
    /* 充满全屏 */
    height: 100%; //设置div高度
    width: 100%; //设置div宽度

    .login-Form {
        padding: 40px 60px;
    }

    .login-tabs {
        width: 600px;
        margin: auto;
        margin-top: 40px;
        //border: 2px double #cec7c7;
        opacity: 0.9;
    }
}
</style>