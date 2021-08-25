<template>
    <div id="home">
        <!-- 内容区域 -->
        <div class="wrap">
            <!-- 通知区域 -->
            <home-notify :notify="notify" />

            <div class="content">
                <!-- 书籍列表区域 -->
                <home-bookList
                    :bookList="bookList"
                    :currentPage="currentPage"
                    :totalCount="totalCount"
                    :pageSize="pageSize"
                    @pageChange="pageChange"
                />

                <!-- 热门标签区域 -->
                <hot-recommend class="hidden-sm-and-down"/>
            </div>
        </div>
    </div>
</template>

<script>
import HomeNotify from './childHome/HomeNotify'
import HomeBookList from './childHome/HomeBookList'
import HotRecommend from '../../components/content/HotRecommend'

import { getBookList, searchBookList } from '@/network/book'

export default {
    name: 'Home',
    components: {
        HomeNotify,
        HomeBookList,
        HotRecommend
    },
    mounted() {
        this._getBookList(this.categoryID)
        // 监听导航的点击
        this.$bus.$on('navClick', async categoryID => {
            // 获取点击的分类id
            this.categoryID = categoryID
            // 重新获取小说列表
            await this._getBookList(this.categoryID)
            window.location.reload()
            
        })
        // 监听搜索按钮的点击
        this.$bus.$on('searchClick', searchValue => {
            this._searchBookList(searchValue)
        })
    },
    data() {
        return {
            notify: '去年定了一个目标存款三万，今年掐指一算，还差五万',
            categoryID: this.$route.query.category_id || 1,  // 当前分类id
            bookList: [],  // 小说列表
            currentPage: 1,// 记录当前的页码
            totalCount: 200, // 当前分类下的所有小说个数
            pageSize: 16,  // 每页展示多少条数据
        }
    },
    methods: {
        /**
         * 网络请求相关
         */
        // 获取小说列表
        async _getBookList(categoryID, pageSize, pageNum) {
            let { data } = await getBookList(categoryID, pageSize, pageNum)
            this.bookList = data
            this.totalCount = data[0].totalCount
        },
        // 根据关键字搜索小说列表
        async _searchBookList(searchValue) {
            let { data } = await searchBookList(searchValue)
            if (data.length === 0) {
                this.$router.push('/404')
            }
            this.bookList = data
            window.scrollTo(0, 0)
        },

        /**
         * 事件监听相关
         */
        // 监听页码发生变化
        pageChange(newPage) {
            this.currentPage = newPage
            this._getBookList(this.categoryID, this.pageSize, this.currentPage)
            window.scrollTo(0, 0)
        }
    },
};
</script>

<style lang="less" scoped>
#home {
    padding-bottom: 40px;
    background-color: rgb(238, 238, 238);
    overflow: hidden;
    .wrap {
        width: 85vw;
        // width: 1280px;
        // background: white;
        margin: auto;
        .content {
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
