<template>
    <div id="header">
        <img src="~@/assets/img/logo.png" alt="" />
        <div class="nav" ref="nav">
            <div class="wrap">
                <div class="left">
                    <div
                        v-for="(item, index) in navList"
                        :key="item.category_id"
                        class="nav-item"
                        :class="{ active: currentIndex === index }"
                        @click="navItemClick(index, item.category_id)"
                    >
                        {{ item.category_name }}
                    </div>
                </div>

                <div class="right hidden-sm-and-down">
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="searchValue"
                    >
                    </el-input>
                    <el-button type="primary" @click="searchClick"
                        >搜索</el-button
                    >
                </div>

                <div class="menu">
                    <i class="el-icon-s-operation" @click="menuClick"></i>
                    <div class="menu-list" v-show="showMenu">
                        <div
                            v-for="(item, index) in navList"
                            :key="item.category_id"
                            class="nav-item"
                            :class="{ active: currentIndex === index }"
                            @click="navItemClick(index, item.category_id)"
                        >
                            {{ item.category_name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getCategoryList, getBookList } from '@/network/book'
export default {
    data() {
        return {
            currentIndex: 0, // 记录当前的tabbar
            navList: [],
            searchValue: '', // 搜索框的值
            showMenu: false, 
        }
    },
    mounted() {
        // 监听页面的滚动
        document.addEventListener('scroll', this.showNavBar)
        // 获取分类列表
        this._getCategoryList()
        // 页面刷新时获取前端路由的分类id，记录要高亮的tabbar
        console.log(location);
        let arr = location.href.split('category_id=')[1]
        if (!arr) {
            return this.currentIndex = 0
        }
        let category_id = arr && arr.substr(0, 1)
        this.currentIndex = category_id - 1

    },
    methods: {
        /**
         * 事件点击相关
         */
        // 监听导航栏的点击事件
        navItemClick(index, category_id) {
            this.currentIndex = index
            // 发射中央事件总线，携带分类id
            this.$bus.$emit('navClick', category_id)
            // 跳转路由到首页
            this.$router.push({
                path: '/home',
                query: { category_id }
            })
        },

        // 监听搜索按钮的点击事件
        searchClick() {
            // 发射中央事件总线，携带分类id
            this.$bus.$emit('searchClick', this.searchValue)
            // 跳转路由到首页
            this.$router.push({
                path: '/home',
                query: { key: this.searchValue }
            })
        },

        // 滚动到一定程度实现吸顶效果
        showNavBar() {
            // 将导航设为固定定位
            let navEle = this.$refs.nav
            if (window.pageYOffset >= 112.88888) {
                navEle.style.position = 'fixed'
                navEle.style.top = 0
                navEle.style.zIndex = 9999
            } else {
                navEle.style.position = 'absolute'
                navEle.style.top = (166 - 52) + 'px'
            }
        },

        // 监听菜单按钮的点击
        menuClick() {
            this.showMenu = !this.showMenu
        },


        /**
         * 网络请求相关
         */
        async _getCategoryList() {
            let { data } = await getCategoryList()
            this.navList = data
        }
    },
};
</script>

<style scoped lang="less">
#header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 166px;
    background-image: url("../../assets/img/header.jpg");
    background-size: cover;
    &:hover {
        cursor: pointer;
    }
    img {
        position: relative;
        top: -20px;
        width: 200px;
        height: 60px;
    }
    .nav {
        position: absolute;
        width: 100%;
        height: 52px;
        line-height: 52px;
        bottom: 0;
        background-color: rgba(92, 92, 92, 0.8);
        color: white;
        .wrap {
            position: relative;
            display: flex;
            justify-content: space-between;
            width: 85vw;
            margin: 0 auto;
            height: 52px;
            // overflow: hidden;
            .left {
                display: flex;
                .nav-item {
                    width: 110px;
                    text-align: center;
                }
                .active {
                    background: #333;
                    opacity: 0.8;
                }
            }
            .right {
                display: flex;
                align-items: center;
                .el-button {
                    margin-left: 15px;
                    border-radius: 20px;
                }
            }
            .menu {
                position: absolute;
                left: 0;
                i {
                    font-size: 30px;
                    display: none;
                }
                .menu-list {
                    position: absolute;
                    left: 0;
                    top: 50px;
                    display: flex;
                    flex-wrap: wrap;
                    z-index: 9999;
                    .nav-item {
                        width: 70vw;
                        color: black;
                        font-weight: bold;
                        background: rgba(217, 217, 217, .9);
                        padding: 10px 0 0 15px;
                        border-bottom: 1px solid #555;
                    }
                }
            }
        }
    }
}

// 媒体查询
@media screen and (max-width: 768px) {
    #header {
        .nav {
            .wrap {
                .left {
                    display: none;
                }
                .menu {
                    i {
                        display: inline-block;
                    }
                }
            }
        }
    }
}
</style>
