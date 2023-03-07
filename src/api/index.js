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

//用户余额充值
export const recharge = (id, originBl, chargeNum) => ajax(BASE_URL + 'api/recharge', { id, originBl, chargeNum }, 'POST')

/*主页方法*/

//请求主页轮播图
export const getHomeBanner = () => ajax(BASE_URL + 'api/homebanner')

//请求主页商品类别数
export const getCategory = () => ajax(BASE_URL + 'api/category')

//请求主页商品数据
export const getHomeProductList = () => ajax(BASE_URL + 'api/homeproductlist')

//请求商品详细数据
export const getGoodsDetail = (params) => ajax(BASE_URL + 'api/goodsdetail', params)

//请求商品的评价
export const getComment = (params) => ajax(BASE_URL + 'api/comment', params);

//评论发表
export const postComment = (goods_id, comment_detail, comment_rating, user_id) => ajax(BASE_URL + 'api/postcomment', { goods_id, comment_detail, comment_rating, user_id }, 'POST');

//请求各个类别下的商品数据
export const getCategoryGoodsList = (params) => ajax(BASE_URL + 'api/categorygoodslist', params);

//商品关键词搜索
export const searchProductKeywords = (keywords) => ajax(BASE_URL + 'api/productsearch', { keywords }, 'POST');

/**购物车方法 */

//添加购物车物品
export const addGoodsToCart = (user_id, goods_id, goods_name, thumb_url, price, buy_count, counts) => ajax(BASE_URL + 'api/cart_addgoods', { user_id, goods_id, goods_name, thumb_url, price, buy_count, counts }, 'POST');

// 请求购物车的数据
export const getCartGoods = (params) => ajax(BASE_URL + 'api/cart_goods', params);

// 删除单个商品
export const deleteCartGood = (goods_id, user_id) => ajax(BASE_URL + 'api/delete_cart_good', { goods_id, user_id }, 'POST');

// 删除所有商品
export const deleteCartAllGoods = (user_id) => ajax(BASE_URL + 'api/delete_cart_all_goods', { user_id }, 'POST');



/**管理员方法 */

//管理员登录
export const adminLogin = (username, password) => ajax(BASE_URL + 'api/adminlogin', { username, password }, 'POST');

//管理员退出登录
export const adminLogout = () => ajax(BASE_URL + 'api/adminlogout');

//请求所有商品的数据
export const getAllgoods = () => ajax(BASE_URL + 'api/getallgoods');

//删除商品
export const deleteGoods = (goods_id) => ajax(BASE_URL + 'api/delete_goods', { goods_id }, 'POST');

//更新商品信息
export const updateGoodsInfo = (params) => ajax(BASE_URL + 'api/update_goodsinfo', params, 'POST');

//上架商品
export const addGoods = (params) => ajax(BASE_URL + 'api/addgoods', params, 'POST');

//请求所有用户的数据
export const getAllUsers = () => ajax(BASE_URL + 'api/allusers');




