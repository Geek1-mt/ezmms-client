import {
    getUserInfo,
    getHomeBanner,
    getCategory,
    getHomeProductList,
    getGoodsDetail,
    getComment,
    getCategoryGoodsList,
    searchProductKeywords,
} from '../api'

import {
    USER_INFO,
    HOME_BANNER,
    CATEGORY_LIST,
    HOME_PRODUCT_LIST,
    GOODS_DETAIL,
    COMMENT,
    CATEGORY_GOODS_LIST,
    PRODUCT_SEARCH


} from './mutation-types'

export default {
    //同步用户的信息
    syncUserInfo({ commit }, userInfo) {
        commit(USER_INFO, { userInfo });
    },

    //异步获取用户信息
    async getUserInfo({ commit }, params) {
        let userInfo = {};
        const result = await getUserInfo(params);
        if (result.success_code === 200) {
            userInfo = result.message;
            window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        } else {
            userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        }
        commit(USER_INFO, { userInfo });
    },


    //获取轮播图
    async reqHomeBanner({ commit }) {
        const result = await getHomeBanner();
        commit(HOME_BANNER, { homebanner: result.message })
    },

    //获取商品类别
    async reqCategory({ commit }) {
        const result = await getCategory();
        commit(CATEGORY_LIST, { categoryList: result.message })
    },

    //获取商品数据
    async reqHomeProductList({ commit }) {
        const result = await getHomeProductList();
        commit(HOME_PRODUCT_LIST, { homeproductlist: result.message });
    },

    //获取商品详细数据
    async reqGoodsDetail({ commit }, params) {
        const result = await getGoodsDetail(params);
        commit(GOODS_DETAIL, { goodsDetail: result.message });
    },

    //获取评价
    async reqComment({ commit }, params) {
        const result = await getComment(params);
        commit(COMMENT, { comment: result.message });
    },

    //获取各类别商品数据
    async reqCategoryGoodsList({ commit }, params) {
        const result = await getCategoryGoodsList(params);
        commit(CATEGORY_GOODS_LIST, { categorygoodslist: result.message });
    },

    //模糊搜索获取商品数据
    async reqSearch({ commit }, { keywords }) {
        const result = await searchProductKeywords(keywords)
        if (result.success_code === 200) {
            let searchresults = result.message
            commit(PRODUCT_SEARCH, { searchresults })
        }
    }
}