<template>
    <div>
        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchValue"
        >
        </el-input>
        <el-button type="primary">搜索</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchValue: ''
        }
    },
};
</script>

<style scoped>
</style>
