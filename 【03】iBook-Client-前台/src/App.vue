<template>
    <div id="app">
        <!-- 头部区域 -->
        <nav-bar />

        <!-- 中间内容区域 -->
        <router-view></router-view>
        <!-- <test></test> -->

        <!-- 底部区域 -->
        <bottom-bar />

        <!-- 回到顶部按钮 -->
        <el-backtop></el-backtop>
    </div>
</template>

<script>
import NavBar from './components/content/NavBar'
import BottomBar from './components/content/BottomBar'
import Test from './Test'
export default {
    components: {
        NavBar,
        BottomBar,
        Test
    },
    data() {
        return {

        }
    },
};
</script>

<style scoped>
@import url("./assets/css/reset.css");
</style>
