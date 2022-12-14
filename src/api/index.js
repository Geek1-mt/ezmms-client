import ajax from "./ajax";

//1-基础路径

const BASE_URL = 'http://localhost:3000/' //防止跨域
// const BASE_URL = 'http://localhost:3000';  // 服务器真实地址

//2-请求方法

//用户注册

export const register = (username, password) => ajax(BASE_URL + 'api/register', { username, password }, 'POST')

//用户名+密码登录
export const pwdLogin = (username, password) => ajax(BASE_URL + 'api/login', { username, password }, 'POST')


//获取登录的用户信息
export const getUserInfo = (params) => ajax(BASE_URL + 'api/user_info', params)

//更新-修改用户信息
export const changeUserInfo = (params) => ajax(BASE_URL + 'api/update_user_info', params, 'POST')

// 修改用户密码
export const changeUserPw = (id, originPw, newPw) => ajax(BASE_URL + 'api/update_user_password', { id, originPw, newPw }, 'POST');






