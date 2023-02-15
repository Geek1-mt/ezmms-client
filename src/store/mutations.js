import Vue from "vue";

import {
    USER_INFO,
    HOME_BANNER,
    CATEGORY_LIST,
    HOME_PRODUCT_LIST,
} from './mutation-types'

export default {
    [USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo;
    },

    [HOME_BANNER](state, { homebanner }) {
        state.homebanner=homebanner
    },
    [CATEGORY_LIST](state,{categoryList}){
        state.categoryList = categoryList
    },
    [HOME_PRODUCT_LIST](state,{homeproductlist}){
        state.homeproductlist=state.homeproductlist.concat(homeproductlist)
    }
}