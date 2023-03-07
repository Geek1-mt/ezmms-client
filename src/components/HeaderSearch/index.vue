<template>
    <div class="header_container">
        <!-- <div class="header_img"><img src="" /></div> -->
        <div class="header_search">
            <div>
                <input type="text" placeholder="请输入商品名称" v-model="keywords" />
                <el-button type="primary" icon="el-icon-search" @click="postSearch"></el-button>
            </div>
            <p>
                <a>商品促销中</a>
                <a>衣服装饰</a>
                <a>PC电子配件</a>
                <a>电子书籍</a>
                <a>限时折扣</a>
            </p>
        </div>
        <div class="shopping_bag">
            <a @click.prevent="goShopCart"><i class="el-icon-shopping-cart-2"></i>&nbsp;&nbsp;我的购物车</a>
        </div>
    </div>
</template>

<script>

import { MessageBox } from 'element-ui'
import { mapState } from 'vuex';

export default {
    data() {
        return {
            keywords: ''
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        goShopCart() {
            if (this.userInfo.id) {
                this.$router.replace('/shopcart');
            }

        },
        async postSearch() {
            if (this.keywords) {
                let keywords = this.keywords;
                this.$store.dispatch('reqSearch', { keywords });
                this.$router.replace('/productsearch');
                
            }
        },
    },


}
</script>

<style scoped>
/*头部搜索区*/
.header_container {
    position: relative;
    width: 100%;
    height: 150px;
    margin: 0;
    padding: 0;
}

/*商城标识图片区域*/
.header_container>.header_img {
    position: absolute;
    left: 100px;
    margin-top: 10px;
    width: 140px;
    height: 140px;
    border: 1px solid darkgray;
    box-shadow: 2px 4px 15px rgba(45, 45, 45, 0.15);
    border-radius: 50%;
}

.header_img>img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

/*鼠标移入图片实现3d动画*/
.header_img:hover {
    transform-style: preserve-3d;
    transform: rotateY(360deg);
    transition: all 1500ms;
    -moz-transform-style: preserve-3d;
    -moz-transform: rotateY(45deg);
    -moz-transition: all 1500ms;
}

.header_search {
    position: absolute;
    left: 50%;
    margin-left: -290px;
    margin-top: 50px;
}

.header_search div {
    display: flex;
    align-items: center;
}

.header_search input {
    padding-left: 10px;
    width: 490px;
    height: 35px;
    font-size: 14px;
    line-height: 35px;
    border: 2px solid rgb(203, 177, 177);
    border-right: none;
    outline: none;
}

.header_search button.el-button.el-button--primary {
    padding: 0px;
    width: 60px;
    height: 40px;
    font-size: 18px;
    border-radius: 0;
    outline: none;

    display: flex;
    justify-content: center;
    align-items: center;
}

.header_search>p>a {
    display: inline-block;
    padding: 5px 10px;
    font-size: 12px;
    color: #999;
    cursor: pointer;
}

.header_search>p>a:hover {
    color: red;
}

/*头部的购物车标记区域*/
.header_container>.shopping_bag {
    position: absolute;
    margin-top: 60px;
    right: 120px;
    width: 190px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    font-size: 12px;
    background: #eaeff4;
    color: red;
    cursor: pointer;
}

.shopping_bag>img {
    display: inline-block;
    margin-left: 5px;
    margin-top: 5px;
    width: 17px;
    height: 17px;
}

.shopping_bag>a {
    color: rgb(0, 145, 255);
}
</style>