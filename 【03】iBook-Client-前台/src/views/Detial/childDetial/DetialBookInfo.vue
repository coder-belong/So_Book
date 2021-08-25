<template>
    <div id="book-info">
        <div class="book-base-info">
            <div class="book-name">{{ bookDetialInfo.book_name }}</div>
            <div class="book-other">
                <div>
                    <i class="el-icon-folder-opened"></i>
                    <span>{{ bookDetialInfo.category_name }}</span>
                </div>

                <div>
                    <i class="el-icon-user-solid"></i>
                    <span>{{ bookDetialInfo.book_author }}</span>
                </div>
                <div>
                    <i class="el-icon-s-grid"></i>
                    <span>扫描二维码</span>
                </div>
            </div>
        </div>
        <div class="detial-info">
            <div class="left">
                <img :src="bookDetialInfo.book_img_url" />
            </div>
            <div class="right">
                <p>
                    <i class="el-icon-info"></i>
                    <span>
                        <strong>书名：</strong>
                        {{ bookDetialInfo.book_name }}
                    </span>
                </p>
                <p>
                    <i class="el-icon-info"></i>
                    <span>
                        <strong>作者：</strong>
                        {{ bookDetialInfo.book_author }}
                    </span>
                </p>
                <p>
                    <i class="el-icon-info"></i>
                    <span>
                        <strong>格式：</strong>
                        EPUB/MOBI/AZW3
                    </span>
                </p>
                <p>
                    <i class="el-icon-info"></i>
                    <span>
                        <strong>标签：</strong>
                        {{ bookDetialInfo.tag }}
                    </span>
                </p>
                <p>
                    <i class="el-icon-info"></i>
                    <span>
                        <strong>时间：</strong>
                        {{ bookDetialInfo.public_time }}
                    </span>
                </p>
                <p>
                    <i class="el-icon-info"></i>
                    <span>
                        <strong>评分：</strong>
                        9.9
                    </span>
                </p>
                <p>
                    <i class="el-icon-info"></i>
                    <span>
                        <strong>ISBN：</strong>
                        9787553813226
                    </span>
                </p>
            </div>
        </div>
        <div class="content-introduce">
            <div class="title">内容简介</div>
            <div class="content">
                <p>
                    内容简介“思维”是人类个体独自的狂欢吗？在进化成为现代人的历程中，人类这一物种到底经历了怎样的思维变革？本书为你讲述一个人类思维诞生的故事，故事将以我们的祖先类人猿作为开头，以现代人类和他们的文明结束
                    。
                </p>

                <p>
                    自从达尔文开始，思想家难以从根本上找出人类与其他动物的本质差异所在。
                </p>
                <p>
                    心理学思想家迈克尔·托马塞洛以数据和实证讲述了一个人类思维诞生的故事。
                </p>
                <p>
                    故事将从我们的祖先类人猿开始，以现代人类和他们的文明结束。
                </p>
                <p>
                    “思维”是人类个体独自的狂欢吗？与类人猿相比，人类的思维独特性到底是什么？在进化成为现代人的历程中，人类这一物种到底经历了怎样的思维变革？托马塞洛超过二十年的人类和类人猿比较研究指出，一旦我们的祖先学会与他人一起追求共同的目标，人类便找到了属于自己的进化之路
                </p>
                <!-- {{ bookDetialInfo.content_brief }} -->
            </div>
        </div>
        <div class="author-introduce">
            <div class="title">作者简介</div>
            <div class="content">
                <p>
                    蒋巍巍，高级企业管理顾问，著名领导力讲师，新锐派情商训练导师，常年专注于性格，情商，领导力领域的研究和授课，被企业评为“最实用的领导力”讲师，被学员誉为“职场干货培训师”。
                </p>
                <p>
                    常年担任《哈佛商业评论》《麦肯锡季刊》《世界经理人》《中人网》《价值中国》等一流财经媒体专栏撰稿人。
                    曾在解放军某快速反应部队任职，退伍后就职于TCL集团、影响力集团，三叶集团。
                </p>
                <p>
                    担任过班组长，车间主任，产品经理，渠道经理，市场部经理，营销部长，分公司总经理，培训总监，大区总监，营销中心总经理，常务副总经理，COO,CEO，独立董事等职位。
                </p>
                <p>
                    《成长力》《跟FBI学阅人术》《冲突管理》《左右逢源》《打造高绩效团队》《影响团队执行力的八大根源》《提高决策力的51条法则》《总裁变革智慧》等。
                </p>
            </div>
        </div>
        <div class="reward">
            <div class="title">你对本文的评价</div>
            <div class="money">
                <div class="a1">一般，赏五毛</div>
                <div class="a2">赏一元</div>
                <div class="a3">还可以，支持五元</div>
                <div class="a4">神作，赐五十元</div>
            </div>
            <div class="bottom">
                <p class="p1">
                    <span @click="openModalBox">赏</span>
                </p>

                <p class="p2">
                    如果本站的资源对您有些帮助，欢迎点击上方按钮打赏！
                </p>
                <p class="p3">“ 感谢您对 iBook 的支持！”</p>
            </div>
            <div class="category-name">
                <i class="el-icon-price-tag"></i>
                <span>历史传记</span>
            </div>
            <div class="book-context">
                <div class="pre">
                    <span>上一篇：</span>
                    <span @click="contextClick('pre')">
                        {{ bookContextInfo[0] && bookContextInfo[0].book_name }}
                    </span>
                </div>
                <div class="next">
                    <span>下一篇：</span>
                    <span @click="contextClick('next')">
                        {{ bookContextInfo[1] && bookContextInfo[1].book_name }}
                    </span>
                </div>
            </div>
            <div class="other-book">
                <div class="img-list">
                    <img v-for="item in otherBookImg" :key="item" :src="item" />
                </div>
                <div class="book-name">
                    <div class="line" v-for="item in 6" :key="item">
                        <div>
                            <i class="el-icon-copy-document"></i>
                            <span>家人父子</span>
                        </div>
                        <div>
                            <i class="el-icon-copy-document"></i>
                            <span>尼尔弗格森看历史（共5册） </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="public-comment">
                <div class="title">发表你的评论</div>
                <!-- 富文本编辑器 -->
                <quill-editor v-model="commentContent" />
                <div class="btn">
                    <el-button type="primary">发布评论</el-button>
                </div>
            </div>
        </div>

        <transition name="fade">
            <!-- 模态框 -->
            <modal-box
                ref="modalBox"
                v-show="modalShow"
                @closeClick="closeClick"
            />
        </transition>
    </div>
</template>

<script>
import ModalBox from '@/components/common/ModalBox'
export default {
    props: {
        bookDetialInfo: {
            type: Object
        },
        bookContextInfo: {
            type: Array,
        }
    },
    components: {
        ModalBox
    },
    data() {
        return {
            commentContent: '',  // 富文本编辑器内容
            modalShow: false,  // 控制模态框是否展示
            otherBookImg: [
                'https://sobooks.cc/wp-content/themes/Git/timthumb.php?src=https://img1.doubanio.com/lpic/s28278087.jpg&h=260&w=190&q=90&zc=1&ct=1',
                'https://sobooks.cc/wp-content/themes/Git/timthumb.php?src=https://img1.doubanio.com/lpic/s29417837.jpg&h=260&w=190&q=90&zc=1&ct=1',
                'https://sobooks.cc/wp-content/themes/Git/timthumb.php?src=https://images-cn.ssl-images-amazon.com/images/I/51QTIE4NIAL.jpg&h=260&w=190&q=90&zc=1&ct=1',
                'https://sobooks.cc/wp-content/themes/Git/timthumb.php?src=https://images-cn.ssl-images-amazon.com/images/I/512gmX9vPML.jpg&h=260&w=190&q=90&zc=1&ct=1',

            ]
        }
    },
    methods: {
        /**
         * 事件监听相关
         */
        // 打开打赏页面的模态框
        openModalBox() {
            this.modalShow = true
        },
        // 关闭模态框的点击 
        closeClick() {
            this.modalShow = false
        },
        // 监听上一篇，下一篇文章的点击
        contextClick(option) {
            let target_bookID = ''
            // 判断点击的操作，然后携带id跳转到详情页
            if (option === 'pre') {
                target_bookID = this.bookContextInfo[0].book_id

            } else {
                target_bookID = this.bookContextInfo[1].book_id
            }

            // 携带id路由跳转
            this.$emit('contextClick', target_bookID)
            this.$router.push({
                path: '/detial',
                query: { bookID: target_bookID },
            })
        },


        /**
         * 网络请求相关
         */
        // 获取前一篇和下一篇的小说名称


    },
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

#book-info {
    margin-right: 20px;
    padding: 15px;
    background: white;
    .book-base-info {
        margin-bottom: 20px;
        .book-name {
            font-size: 24px;
            height: 50px;
            line-height: 50px;
        }
        .book-other {
            padding: 15px;
            border-bottom: 1px dashed #eaeaea;
            display: flex;
            font-size: 13px;
            div {
                margin-right: 15px;
                i {
                    margin-right: 5px;
                }
            }
        }
    }
    .detial-info {
        width: 60%;
        display: flex;
        align-items: center;
        padding: 20px 15px;
        overflow: hidden;
        margin-bottom: 20px;
        background: rgb(238, 238, 238);
        .left img {
            width: 185px;
            height: 250px;
            margin-right: 20px;
        }
        .right {
            font-size: 16px;

            p {
                width: 350px;
                overflow: hidden;
                color: #555;
                margin-bottom: 15px;
                white-space: nowrap;
                text-overflow: ellipsis;
                i {
                    margin-right: 10px;
                }
            }
        }
    }
    .content-introduce,
    .author-introduce {
        .title {
            font-size: 20px;
            font-weight: bold;
            background: rgb(251, 251, 251);
            border-left: 7px solid #00a67c;
            padding: 10px;
            border-bottom: 1px solid #00a67c;
            margin: 20px 0;
            border-radius: 4px;
        }
        .content {
            margin-bottom: 15px;
            p {
                text-indent: 32px;
                margin-bottom: 20px;
            }
        }
    }

    .reward {
        .title {
            font-size: 16px;
            background: rgb(251, 251, 251);
            border-left: 7px solid goldenrod;
            padding: 10px;
            border-bottom: 1px solid goldenrod;
            margin: 20px 0;
            background: rgb(238, 225, 192);
            border-radius: 4px;
        }
        .money {
            display: flex;
            div {
                padding: 10px 7px;
                box-shadow: 2px 3px 7px #9e9e9e;
                margin-right: 40px;
                border-radius: 10%;
                &:hover {
                    cursor: pointer;
                }
            }
            .a1 {
                background: rgb(169, 221, 241);
            }
            .a2 {
                background: rgb(142, 234, 154);
            }
            .a3 {
                background: rgb(231, 197, 112);
            }
            .a4 {
                background: rgb(243, 88, 88);
            }
        }
        .bottom {
            margin-top: 65px;
            text-align: center;
            .p1 {
                margin-bottom: 50px;
                span {
                    padding: 20px;
                    background: rgb(218, 165, 32);
                    color: white;
                    border-radius: 50%;
                    font-size: 18px;
                    font-weight: bold;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
            .p2 {
                color: gray;
                margin-bottom: 15px;
            }
            .p3 {
                font-weight: bold;
                color: #f18c8c;
            }
        }
    }
    .category-name {
        margin-top: 44px;
        i {
            margin-right: 10px;
            font-size: 23px;
        }
        span {
            color: white;
            background: rgb(138, 140, 89);
            padding: 12px 8px;
        }
    }
    .book-context {
        display: flex;
        justify-content: space-between;
        background: rgb(249, 249, 249);
        padding: 15px;
        margin: 40px 0;
        border-top: 1px solid #eaeaea;
        border-bottom: 1px solid #eaeaea;
        border-radius: 4px;
        span:nth-child(2) {
            &:hover {
                color: #00a67c;
                cursor: pointer;
            }
        }
    }
    .other-book {
        padding: 30px 0;
        .img-list {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            img {
                width: 150px;
                height: 230px;
                margin-right: 10px;
                box-shadow: 2px 3px 7px #9e9e9e;
            }
        }
        .book-name {
            .line {
                padding: 10px 150px 10px 10px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px dashed #eaea;
                div:hover {
                    color: #00a67c;
                    cursor: pointer;
                }
                i {
                    margin-right: 7px;
                }
            }
        }
    }
    .public-comment {
        .title {
            background: rgb(251, 251, 251);
            border-left: 7px solid #00a67c;
            padding: 15px 10px;
            border-bottom: 1px solid #00a67c;
            margin: 20px 0;
            border-radius: 4px;
        }
        .quill-editor /deep/ .ql-container {
            height: 200px;
        }
        .btn {
            text-align: right;
            .el-button {
                margin-top: 20px;
            }
        }
    }
}
</style>
