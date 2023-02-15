import {
    getUserInfo,
    getHomeBanner,
    getCategory,
    getHomeProductList,
} from '../api'

import {
    USER_INFO,
    HOME_BANNER,
    CATEGORY_LIST,
    HOME_PRODUCT_LIST,


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

    async reqHomeProductList({commit}) {
        const result = await getHomeProductList();
        commit(HOME_PRODUCT_LIST, {homeproductlist: result.message});
      },
}