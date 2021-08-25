<template>
    <div id="detial">
        <!-- 内容区域 -->
        <div class="wrap">
            <!-- 通知区域 -->
            <detial-notify :notify="notify" />

            <div class="content">
                <!-- 书籍详情信息区域 -->
                <detial-book-info
                    :bookDetialInfo="bookDetialInfo"
                    :bookContextInfo="bookContextInfo"
                    @contextClick="contextClick"
                />

                <!-- 热门标签区域 -->
                <hot-recommend />
            </div>
        </div>
    </div>
</template>

<script>
import DetialNotify from './childDetial/DetialNotify'
import DetialBookInfo from './childDetial/DetialBookInfo'
import HotRecommend from '../../components/content/HotRecommend'

import { getBookDetialInfo } from '../../network/book.js'

export default {
    components: {
        DetialNotify,
        DetialBookInfo,
        HotRecommend
    },
    mounted() {
        // 返回到顶部
        window.scrollTo(0, 0)
        // 获取前端路由的地址栏参数
        let { bookID } = this.$route.query
        this.bookID = bookID
        // 根据小说id获取小说详情信息
        this._getBookDetialInfo(this.bookID)
        // 获取小说的前一篇文章和后一篇文章信息
        this._getBookContextInfo(this.bookID)
    },
    data() {
        return {
            notify: '有些事情还是要坚持的，比如睡觉，特别是闹钟响起的那一刻。',
            bookID: '1',  // 记录点击到到小说id
            bookDetialInfo: {},  // 小说的详情信息
            bookContextInfo: [],  // 小说的上下文信息
        }
    },
    methods: {
        // 获取小说详情信息
        async _getBookDetialInfo(id) {
            let { data } = await getBookDetialInfo(1, id)
            // 如果该小说没有详情数据，就跳转到404页面
            if (data.length === 0) {
                return this.$router.push('/404')
            }
            this.bookDetialInfo = data[0]
        },
        // 获取小说的前一篇文章和后一篇文章信息
        async _getBookContextInfo(id) {
            let { data: preData } = await getBookDetialInfo(1, id - 1)
            let { data: nextData } = await getBookDetialInfo(1, Number(id) + 1)
            this.bookContextInfo = [preData[0], nextData[0]]
        },

        contextClick(id) {
            // 返回到顶部
            window.scrollTo(0, 0)
            this.bookID = id
            this._getBookDetialInfo(this.bookID)
            this._getBookContextInfo(this.bookID)
            // console.log();
        }
    },
};
</script>

<style lang="less" scoped>
#detial {
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
