import {
    getUserInfo
} from '../api'

import {
    USER_INFO
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
}