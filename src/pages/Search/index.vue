<template>
    <div v-if="categoryList.length">
        <div id="container">
            <div class="product">
                <div class="pro_line">

                    <h3 v-text="this.categoryList[this.currentCate - 1].cate_name"></h3>
                    &nbsp;
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            其他类别<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(cate, index) in categoryList" :key="index" :command="index + 1">{{
                                cate.cate_name }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <router-link to="/home" class="goHome">返回首页</router-link>
                </div>
                <br>
                <div class="pro_show">
                    <ProductItem v-for="(goods) in categorygoodslist" :key="goods.goods_id" :pro="goods" />
                </div>
            </div>
        </div>
        <div id="footer">
            <ul class="pagination">
                <li><a class="pag_back" @click="getMore(activeIndex - 1)">«</a></li>
                <li><a class="pag_a" v-for="index in catePages[this.currentCate - 1]" :key="index"
                        :class="{ pag_active: activeIndex === index }" @click="getMore(index)">{{ index }}</a></li>
                <li><a class="pag_go" @click="getMore(activeIndex + 1)">»</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

//引入组件
import ProductItem from '../../components/ProductItem'

export default {
    data() {
        return {
            activeIndex: 1,  // 当前页码
            currentCate: 1,  // 当前分类
            pageSize: 6,
        }
    },
    components: {
        ProductItem
    },
    computed: {
        ...mapState(['userInfo', 'categoryList', 'categorygoodslist']),
        //分页
        catePages() {
            let arr = []
            this.categoryList.forEach((cate, index) => {
                //Math.ceil()函数返回大于或等于一个给定数字的最小整数
                let page = Math.ceil(cate.cate_counts / this.pageSize)
                arr.push(page)
            })
            return arr;
        }
    },
    created() {
        this.activeIndex = Number(this.$route.params.id)
        this.currentCate = Number(this.$route.params.pageNo)
        //请求类别数据
        this.$store.dispatch('reqCategory')
        // 请求当前页码的商品
        this.$store.dispatch('reqCategoryGoodsList', {
            category: this.currentCate,
            pageNo: this.activeIndex,
            count: this.pageSize
        });
        //请求当前用户信息
        this.$store.dispatch('getUserInfo');


    },
    watch: {
        $route() {
            this.currentCate = Number(this.$route.params.id);
            this.activeIndex = Number(this.$route.params.pageNo);
            this.$store.dispatch('reqCategoryGoodsList', {
                category: this.currentCate,
                pageNo: this.activeIndex,
                count: this.pageSize
            });
        }
    },
    methods: {
        handleCommand(command) {
            this.$store.dispatch('reqCategoryGoodsList', {
                category: command,
                pageNo: 1,
                count: this.pageSize
            });
            this.$router.replace('/search/' + command + "/1");
            this.currentCate = command;
            this.activeIndex = 1;
        },
        goDetail(id) {
            this.$router.replace('/goods/' + id);
        },
        getMore(index) {
            if (index && index <= this.catePages[this.currentCate - 1]) {
                this.$store.dispatch('reqCategoryGoodsList', {
                    category: this.currentCate,
                    pageNo: index,
                });
                this.activeIndex = index;
                this.$router.replace('/search/' + this.currentCate + "/" + this.activeIndex);
            }
        },
    },
}
</script>

<style scoped>
#container {
    position: relative;
    margin: 30px auto;
    width: 100%;
}

.product {
    margin: 0 auto;
    width: 980px;
}

.product>.pro_line {
    margin-bottom: 20px;
    width: 980px;
    height: 50px;
    line-height: 50px;
    font-size: 26px;
    font-family: sans-serif;
    font-weight: normal;
    color: #222;
}

.pro_line>h3 {
    display: inline-block;
}

.el-dropdown-link {
    display: inline-block;
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.goHome {
    font-size: 14px;
    display: inline-block;
    margin-left: 20px;
    text-decoration: none;
    color: skyblue;
    cursor: pointer;
}

.goHome:hover {
    color: #ccc;
}

.product>.pro_show {
    margin: 0 auto;
    padding-left: 20px;
    width: 980px;
    height: 300px;
}

.pro_show>.pro {
    position: relative;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    width: 300px;
    height: 200px;
    border: 1px solid gainsboro;
}

.pro>.pro_img {
    margin: 20px;
    width: 120px;
    height: 120px;
}

.pro>.pro_text {
    position: absolute;
    top: 30px;
    right: 0;
    height: 130px;
    width: 140px;
    line-height: 25px;
}

.pro_text>p {
    margin-bottom: 10px;
}

.pro_text>p:first-child {
    color: red;
    font-weight: 900;
}

.pro_text>p:nth-child(2) {
    font-size: 13px;
}

.pro_text>p:nth-child(3) {
    font-size: 12px;
    color: #999;
}

.pro>.add_btn {
    float: right;
    position: absolute;
    bottom: 15px;
    right: 20px;
}

.add_btn>a {
    display: block;
    width: 120px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    background: #FF0036;
    color: white;
    cursor: pointer;
}

#footer {
    height: 50px;
    width: 100%;
    display: flex;
}

#footer>ul.pagination {
    margin: 0 auto;
}

ul.pagination li {
    float: left;
}

ul.pagination li a {
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
    color: black;
    border: 1px solid #ddd;
}

ul.pagination li a.pag_active {
    background-color: #c40000;
    color: white;
    border: 1px solid #c40000;
}

ul.pagination li a:hover:not(.pag_active) {
    background-color: #ddd;
}

div.center {
    text-align: center;
}
</style>