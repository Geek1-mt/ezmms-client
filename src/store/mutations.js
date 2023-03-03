import Vue from "vue";

import {
    USER_INFO,
    HOME_BANNER,
    CATEGORY_LIST,
    HOME_PRODUCT_LIST,
    GOODS_DETAIL,
    COMMENT,
    CATEGORY_GOODS_LIST,
    PRODUCT_SEARCH,
} from './mutation-types'

export default {
    [USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo;
    },

    [HOME_BANNER](state, { homebanner }) {
        state.homebanner = homebanner
    },
    [CATEGORY_LIST](state, { categoryList }) {
        state.categoryList = categoryList
    },
    [HOME_PRODUCT_LIST](state, { homeproductlist }) {
        state.homeproductlist = state.homeproductlist.concat(homeproductlist)
    },
    [GOODS_DETAIL](state, { goodsDetail }) {
        state.goodsDetail = goodsDetail;
    },
    [COMMENT](state, { comment }) {
        state.comment = comment;
    },
    [CATEGORY_GOODS_LIST](state, { categorygoodslist }) {
        state.categorygoodslist = categorygoodslist
    },
    [PRODUCT_SEARCH](state, { searchresults }) {
        state.searchresults = searchresults

    }
}