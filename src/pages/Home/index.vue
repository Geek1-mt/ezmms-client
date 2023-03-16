<template>
    <div id="home">
        <div class="home_top_container">
            <div class="home_top">广场主页</div>
        </div>
        <!-- <router-link to="/user">用户信息主页</router-link>
        &nbsp;
        <span>欢迎用户:{{ userInfo.user_name }}</span>
        &nbsp;
        <el-button type="text" @click="logout" plain>点击退出</el-button> -->
        <div id="container">
            <el-row>
                <!-- 菜单栏目-->
                <el-col :span="4" :offset="1" class="cateList">
                    <div class="cate_img">
                        <i class="el-icon-office-building">商品类别</i>
                    </div>
                    <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff">
                        <el-menu-item index="cate.cate_id" v-for="(cate) in categoryList" :key="cate.cate_id"
                            @click="getRList(cate.cate_id)">
                            <i :class="cate.cate_icon"></i>
                            <span slot="title">{{ cate.cate_name }}</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <!--轮播图-->
                <el-col :span="14">
                    <el-carousel height="320px" v-if="homebanner.length > 0">
                        <el-carousel-item v-for="(banner) in homebanner" :key="banner.id">
                            <img :src="banner.imgurl" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
                <el-col :span="4" class="con_log">
                    <div>
                        <img :src="userInfo.user_avatar" v-if="userInfo.user_avatar" />
                        <img src="../../../public/no_login.png" v-else />
                    </div>
                    <p> 欢迎来到商店广场主页~</p>
                    <p v-if="!userInfo.id">
                        <router-link to="/login">登录</router-link>
                        <router-link to="/login">注册</router-link>
                    </p>
                    <p v-else class="userIn">
                        <a v-if="userInfo.user_nickname">您好,{{ userInfo.user_nickname }}</a>
                        <a v-else>您好,{{ userInfo.user_name }}</a>
                        <router-link to="/user">个人主页</router-link>
                    </p>
                    <button class="welfare" @click="goCart">购物车</button>
                    <button class="vip" @click="goRecharge">充值中心</button>
                </el-col>
            </el-row>

            <!-- 商品展示区域 -->
            <div class="product" v-for="(cate) in categoryList" :key="cate.cate_id">
                <div class="pro_line">
                    <h3>{{ cate.cate_name }}</h3>
                    <div><a @click.prevent="getRList(cate.cate_id)">MORE</a></div>
                </div>
                <div class="pro_show">
                    <br>
                    <ProductItem v-for="(pro) in homeproductlist[cate.cate_id - 1]" :key="pro.goods_id" :pro="pro" />
                </div>
            </div>
            <!-- 尾部 -->
            <div id="footer">
                <img src="../../../public/footer.png" />
                <div class="footer_text"></div>
            </div>

        </div>
        <span style="font-weight:bold;color:royalblue;font-size:18px">↑ 点击右侧图标返回顶部 ↑</span>
        <el-backtop :bottom="100">
            <div
                style=" height: 100%; width: 100%;background-color: #f2f5f6;box-shadow: 0 0 6px rgba(0,0,0, .12);text-align: center; line-height: 40px;border-radius:50%;color: #1989fa;">
                ↑
            </div>
        </el-backtop>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { MessageBox } from 'element-ui'

//引入组件
import ProductItem from '../../components/ProductItem'

export default {

    computed: {
        ...mapState(['homebanner', 'categoryList', 'homeproductlist', 'userInfo'])
    },
    components: {
        ProductItem,

    },
    mounted() {
        //请求轮播图的数据
        this.$store.dispatch('reqHomeBanner')
        //请求主页类别数据
        this.$store.dispatch('reqCategory')
        //请求购物车内的物品数据
        // if (this.userInfo && this.userInfo.id) {
        //     let user_id = this.userInfo.id;
        //     this.$store.dispatch('reqCartsGoods', { user_id });
        // }
    },
    watch: {
        categoryList() {
            this.$nextTick(() => {
                // 请求首页商品数据
                this.$store.dispatch('reqHomeProductList');
            });
        },
    },
    methods: {
        logout() {
            this.$confirm('您确定要退出吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push({ path: '/login', replace: true })
                this.$message({
                    type: 'success',
                    message: '退出成功!请重新登录。'
                });

                //移除用户信息
                window.localStorage.removeItem("userInfo");
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        getRList(cate_id) {
            this.$router.replace('/search/' + cate_id + '/1');
        },
        goCart() {
            this.$router.replace('/shopcart');
        },
        goRecharge() {
            this.$router.replace('/user/rechargecenter');
        }
    },

}
</script>

<style scoped>
#home {
    font-family: "Microsoft YaHei";
    background-image: url("../../../public/MainPage.jpg");
}

.home_top {
    line-height: 50px;
    font-size: 36px;
    height: 50px;
    margin: 20px auto;
    font-weight: bold;
}

.home_top_container {
    display: flex;
}

/*产品展示、购买、分类简介区*/
#container {
    position: relative;
    margin: 60px auto;
    margin-top: 0px;
    width: 100%;
    background: rgba(245, 245, 245, 0.5);
}

#container .el-row .el-col {
    height: 100%;
}

.el-row .cateList .cate_img {
    width: 100%;
    text-indent: 3.6px;
    height: 40px;
    color: white;
    line-height: 40px;
    font-size: 16px;
    background: rgb(100, 156, 220);
}

/*自动播放图片区域*/
.el-col .el-carousel {
    height: 100%;
    /* border-top: 2px solid #e9dde0; */
}

.el-carousel .el-carousel__item img {
    height: 100%;
    width: 100%;
}

/*一级菜单*/

/*展示登录信息区域*/
#container .el-row .con_log.el-col {
    background-image: url("../../../public/MainPage.jpg");
    text-align: center;
    font-size: 15px;
    color: #989898;
    border: 1px solid #ccc;
    height: 320px;
}

.con_log>div {
    margin-top: -30px;
    margin-left: 75px;
    margin-bottom: 60px;
    width: 70px;
    height: 70px;
}

.con_log>div>img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 3px 3px 3px 3px #E3E3E3;
    margin-top: 20px;
}

.con_log>p {
    margin-bottom: 20px;
}

.con_log>p>a {
    font-size: 13px;
    margin-right: 10px;
    margin-bottom: 5px;
    color: #666;
    /* cursor: pointer; */
    text-decoration: none;
}

.con_log>.userIn>a {
    display: block;
}

.con_log>p>a:hover {
    color: rgb(21, 163, 252);
    font-weight: 700;
}

.con_log>button {
    margin-right: 5px;
    width: 70px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    text-align: center;
    border-radius: 13px;
    box-shadow: 6px 8px 20px rgba(45, 45, 45, 0.15);
    transition: background 0.3s ease, color 0.3s ease;
    outline: none;
    border: none;
    cursor: pointer;
}

.con_log>button.welfare {
    color: #3b71e4;
    background: white;
}

.con_log>button.vip {
    color: #e5d790;
    background: #2d2d2a;
}

.con_log>button:hover {
    color: white;
    background: #3b7fe4;
}

/*每类产品的简单展示*/
#container>.product {
    margin-top: 50px;
    width: 100%;
    height: 300px;
}

.product>.pro_line {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 26px;
    font-family: sans-serif;
    font-weight: normal;
    color: #222;
    margin-bottom: 20px;

}

.pro_line>h3 {
    display: inline-block;
    /* color: #b61313;*/
}

.pro_line>div {
    display: inline-block;
    margin-left: 15px;
    cursor: pointer;
}

.pro_line>div>a {
    color: rgb(80, 124, 224);
    font-weight: 700;
    font-size: 17px;
    text-decoration: none;
    transition: 0.5s;
}

.pro_line>div>a:after {
    content: '-»';
    opacity: 0;
    /*opacity属性不占用文档流的空间*/
    transition: 0.5s;
}

.pro_line>div:hover a:after {
    opacity: 1;
}

.product>.pro_show {
    margin: 0 auto;
    padding-left: 20px;
    width: 980px;
    height: 200px;
}

.pro_1 {
    width: 100%;
    text-align: center;
    margin-top: 300px;
}

.pro_1>.item_content {
    width: 100%;
    text-align: center;
}

/*底部对商城的补充说明*/
#footer {
    margin-top: 80px;
    width: 100%;
    height: 150px;
    background: #F0F3EF;
}

#footer>img {
    display: block;
    margin-bottom: 16.5px;

}

#footer>.footer_text {
    width: 100%;
    border-top: 1px solid #DEDEDE;
}
</style>
