import {
    getUserInfo,
    getHomeBanner,
    getCategory,
    getHomeProductList,
    getGoodsDetail,
    getComment,
    getCategoryGoodsList,
    searchProductKeywords,
    getCartGoods,
    deleteCartGood,
    deleteCartAllGoods,
    changeGoodsCount,

} from '../api'

import {
    USER_INFO,
    HOME_BANNER,
    CATEGORY_LIST,
    HOME_PRODUCT_LIST,
    GOODS_DETAIL,
    COMMENT,
    CATEGORY_GOODS_LIST,
    PRODUCT_SEARCH,
    CART_GOODS_LIST,
    SELECTED_SINGLE_GOODS,
    SELECTED_ALL_GOODS,
    DEL_CART_ALL_GOODS,
    DEL_CART_SINGLE_GOOD,
    CHANGE_GOODS_COUNT

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
    },

    //请求购物车数据
    async reqCartGoods({ commit }, params) {
        const result = await getCartGoods(params);
        if (result.success_code === 200) {
            commit(CART_GOODS_LIST, { cartgoods: result.message })
        }
    },

    //选择所有商品
    selectedAll({ commit }, { isSelectedAll }) {
        commit(SELECTED_ALL_GOODS, { isSelectedAll });
    },

    //选择单个商品
    singleSelected({ commit }, { goods }) {
        commit(SELECTED_SINGLE_GOODS, { goods });
    },

    // 删除单个商品
    async delSingleGoods({ commit }, { goods, user_id }) {
        const result = await deleteCartGood(goods.goods_id, user_id);
        if (result.success_code === 200) {
            commit(DEL_CART_SINGLE_GOOD, { goods });
        }
    },

    // 删除所有商品
    async delAllGoods({ commit }, { user_id }) {
        const result = await deleteCartAllGoods(user_id);
        if (result.success_code === 200) {
            commit(DEL_CART_ALL_GOODS);
        }
    },

    // 单个商品数量的改变
    async updateGoodsCount({ commit }, { goods, count, user_id }) {
        const result = await changeGoodsCount(goods.goods_id, count, user_id);
        if (result.success_code === 200) {
            commit(CHANGE_GOODS_COUNT, { goods, count });
        }
    },

}