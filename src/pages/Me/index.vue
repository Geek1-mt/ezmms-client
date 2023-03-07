<template>

    <div class="container-fluid">
        <div class="sidebar-sticky">
            <el-menu default-active="1" class="el-menu-vertical-demo">
                <el-menu-item index="1" @click="goTo('/user/profile')">
                    <i class="el-icon-document-copy"></i>
                    <span slot="title">我的资料</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-edit"></i>
                        <span>编辑信息</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1" @click="goTo('/user/update_userinfo')">修改基本信息</el-menu-item>
                        <el-menu-item index="2-3" @click="goTo('/user/update_password')">修改密码</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-bank-card"></i>
                        <span>支付中心</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1" @click="goTo('/user/balance')">我的余额</el-menu-item>
                        <el-menu-item index="3-2" @click="goTo('/user/rechargecenter')">充值中心</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {

    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        goBack() {
            this.$router.replace('/home');
        },
        goTo(path) {
            this.$router.replace(path);
        },
    },

}
</script>

<style scoped>
.sidebar-sticky {

    display: block;
    text-align: center;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    color: #12263f;
    margin-right: 0;
    font-size: 1.0625rem;
    line-height: inherit;
    white-space: nowrap;
    background: #f8f9fa;
    float: left;
    margin-top: 50px;
    width: 200px;
    height: 200px;
}
</style>