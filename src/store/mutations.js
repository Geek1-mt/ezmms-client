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
    CART_GOODS_LIST,

    SELECTED_SINGLE_GOODS,
    SELECTED_ALL_GOODS,
    DEL_CART_SINGLE_GOOD,
    DEL_CART_ALL_GOODS,
    CHANGE_GOODS_COUNT
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

    },
    [CART_GOODS_LIST](state, { cartgoods }) {
        state.cartgoods = cartgoods;
    },

    [SELECTED_ALL_GOODS](state, { isSelectedAll }) {
        state.cartgoods.forEach((goods) => {
            if (goods.checked) {
                // 该属性存在
                goods.checked = !isSelectedAll;
            } else {
                Vue.set(goods, 'checked', !isSelectedAll);
            }
        });
    },

    [SELECTED_SINGLE_GOODS](state, { goods }) {
        const index = state.cartgoods.indexOf(goods);
        if (!goods.checked) {
            //Vue.set(goods, 'checked', true);
            state.cartgoods[index].checked = true;
        } else {
            state.cartgoods[index].checked = !state.cartgoods[index].checked;
        }
    },

    [DEL_CART_SINGLE_GOOD](state, { goods }) {
        goods.buy_count = 0;
        const index = state.cartgoods.indexOf(goods);
        state.cartgoods.splice(index, 1);
    },

    [DEL_CART_ALL_GOODS](state) {
        state.cartgoods = [];
    },

    [CHANGE_GOODS_COUNT](state, { goods, count }) {
        const index = state.cartgoods.indexOf(goods);
        state.cartgoods[index].buy_count = count;
    },
}