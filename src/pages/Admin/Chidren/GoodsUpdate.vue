<template>
    <div class="goods-detail">
        <div class="goods-detail-top">
            <h3>编辑商品信息</h3>
        </div>
        <div class="goods-detail-group">
            <div class="goods-icon">
                <span>商品图片</span>
                <img :src="goodsInfo.thumb_url" alt="">
            </div>
            <div class="goods-item">
                <span>商品ID</span>
                <span>{{ goodsInfo.goods_id }}</span>
            </div>
            <div class="goods-item">
                <span>商品名称</span>
                <el-input type="text" placeholder="请输入内容" v-model="goodsInfo.short_name" clearable style="width:350px">
                </el-input>
            </div>
            <div class="goods-item">
                <span>商品类别</span>
                <el-select v-model="goodsInfo.category" placeholder="请选择类别">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="goods-item">
                <span>价格(￥)</span>
                <el-input type="number" placeholder="请输入价格" v-model="goodsInfo.price" clearable style="width:100px">
                </el-input>
            </div>
            <div class="goods-item">
                <span>库存(件)</span>
                <el-input type="number" placeholder="请输入库存" v-model="goodsInfo.counts" clearable style="width:100px">
                </el-input>
            </div>
            <div class="goods-item">
                <span>描述</span>
                <el-input type="text" placeholder="请输入内容" v-model="goodsInfo.goods_name" clearable style="width:450px">
                </el-input>
            </div>
            <button @click="saveGoodsInfo()">提交更新</button>
        </div>
    </div>
</template>

<script>
import { getAllgoods } from '../../../api';
export default {
    data() {
        return {
            goodsInfo: {},
            options: [{
                value: 1,
                label: '图书影像'
            }, {
                value: 2,
                label: '家居生活'
            }, {
                value: 3,
                label: '服饰箱包'
            }, {
                value: 4,
                label: '电子数码'
            }, {
                value: 5,
                label: '美食宝典'
            }],
        }
    },
    mounted() {
        this.goodsInfo = JSON.parse(window.localStorage.getItem('goodsInfo'));
    },
    methods: {
        // 修改商品信息
        async saveGoodsInfo() {
            this.goodsInfo.price = Number(this.goodsInfo.price);
            this.goodsInfo.counts = Number(this.goodsInfo.counts);
            this.$confirm('确定要提交更新吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await changeGoodsInfo(this.goodsInfo);
                if (result.success_code === 200) {
                    this.$message({
                        type: 'success',
                        message: '更新商品信息成功'
                    });
                    this.$router.replace('/admin');
                    getAllgoods();
                }
            }).catch(()=>{
                this.$message({
                    type:'info',
                    message:'已取消'
                })
            })


        }
    },
}
</script>

<style scoped lang="less">
.goods-detail {
    width: 70%;
    height: 100%;
    margin: 20px auto;

    .goods-detail-top {
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding-left: 10px;
        font-weight: bold;
    }

    .goods-detail-group {
        .goods-icon {
            height: 60px;
            padding: 0 10px;
            background-color: #fff;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 50px;

            }
        }

        .goods-item {
            height: 60px;
            padding: 0 10px;
            background-color: #fff;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        button {
            width: 16%;
            height: 45px;
            line-height: 40px;
            background-color: rgb(58, 144, 223);
            text-align: center;
            margin: 30px 0;
            border: none;
            font-size: 16px;
            color: #fff;
            border-radius: 10px;
        }

    }
}
</style>