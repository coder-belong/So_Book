<template>
    <div id="bookList">
        <!-- 头部区域 -->
        <div class="header">
            <i class="el-icon-folder"></i>
            <span>{{ bookList[0] ? bookList[0].book_category : "" }}</span>
        </div>
        <!-- 小说列表区域 -->
        <div class="list">
            <div
                class="item"
                v-for="item in bookList"
                :key="item.book_id"
                @click="bookClick(item.book_id)"
            >
                <img :src="item.book_img_url" alt="" />
                <p class="book-name">{{ item.book_name }}</p>
                <p class="book-author">{{ item.book_author }}</p>
                <div class="tag">{{ item.book_category }}</div>
            </div>
        </div>

        <!-- 分页 -->
        <div class="pagination">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalCount"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        bookList: {
            type: Array
        },
        totalCount: Number,
        currentPage: Number,
        pageSize: Number,
    },
    data() {
        return {
            
        }
    },
    methods: {
        /**
         * 事件监听相关
         */
        // 监听小说的点击
        bookClick(book_id) {
            let category_id = this.$route.query.category_id
            // 携带小说id和分类id跳转到详情页路由
            this.$router.push({
                path: '/detial',
                query: { category_id, bookID: book_id, },
            })

        },
        // 监听分页的改变
        handleCurrentChange(newPage) {
            this.$emit('pageChange', newPage)
        }
    },
};
</script>

<style lang="less" scoped>
#bookList {
    width: 60vw;
    .header {
        height: 60px;
        line-height: 60px;
        padding: 0 15px;
        background: rgb(251, 251, 251);
        i {
            margin-right: 10px;
            font-size: 22px;
            font-weight: bold;
            color: #666666;
        }
        span {
            font-size: 22px;
            color: #7a6f6f;
        }
    }
    .list {
        padding: 15px;
        display: flex;
        flex-wrap: wrap;
        background: white;
        .item {
            width: 200px;
            position: relative;
            padding: 10px;
            padding-top: 30px;
            text-align: center;
            border: 1px solid #eaeaea;
            margin-right: 20px;
            margin-bottom: 25px;
            transition: box-shadow 0.5s linear;
            &:hover {
                cursor: pointer;
                box-shadow: -1px 1px 11px #666666;
            }
            img {
                width: 189px;
                height: 260px;
            }
            .book-name {
                font-weight: bold;
                padding-bottom: 5px;
                border-bottom: 1px dashed #eaeaea;
                &:hover {
                    color: turquoise;
                }
            }
            .book-author {
                margin-top: 5px;
                font-size: 12px;
                &:hover {
                    color: turquoise;
                }
            }
            .tag {
                position: absolute;
                top: 0;
                left: 0;
                transform: translate(-20px, 0px);
                background: rgba(181, 181, 181, 0.6);
                padding: 3px;
                border-radius: 5px;
                font-size: 14px;
            }
        }
    }
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
        margin-bottom: 15px;

        height: 70px;
        background: white;
    }
}
</style>
