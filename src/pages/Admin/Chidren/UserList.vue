<template>
    <div id="admin-users">
        <br>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="用户ID(UID)">
            </el-table-column>
            <el-table-column prop="user_name" label="账号">
            </el-table-column>
            <el-table-column label="头像">
                <template slot-scope="scope">
                    <!-- scope.row为每行对象 -->
                    <img :src="scope.row.user_avatar" />
                </template>
            </el-table-column>
            <el-table-column prop="user_nickname" label="昵称">
            </el-table-column>
            <el-table-column prop="user_phone" label="手机">
            </el-table-column>
            <el-table-column prop="user_address" label="地址">
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
import { getAllUsers } from '../../../api';
export default {
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
        this.getUsers()
    },
    methods: {
        async getUsers() {
            const results = await getAllUsers();
            if (results.success_code === 200) {
                this.tableData = results.message;
            }
        }
    },

}
</script>

<style scoped>
img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid gray;
}
</style>