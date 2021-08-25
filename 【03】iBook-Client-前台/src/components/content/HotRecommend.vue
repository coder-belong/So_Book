<template>
    <!-- 热门推荐 -->
    <div id="hot-recommend">
        <!-- 热门标签 -->
        <div class="hot-tag">
            <div class="title">热门标签</div>
            <div class="list">
                <div class="item" v-for="item in 40" :key="item">
                    小说(3070)
                </div>
            </div>
        </div>

        <!-- 近期文章 -->
        <div class="recent-article">
            <div class="title">近期文章</div>
            <div class="list">
                <div class="item" v-for="item in articleList" :key="item">
                    <a href="https://sobooks.cc/books/18717.html">
                        {{ item }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        articleList: [
            '新史学&多元对话系列（第一辑）',
            "龙阙（套装共八册）",
            '如首无作祟之物',
            '抚顺故事集',
            '卡片笔记写作法',
            '马克斯·韦伯：跨越时代的人生',
            '夜间的战斗',
            '讲给大家的中国历史（套装共9册）',
            '外研社博雅文库大全集（套装共24本）',
            '柏拉图哲学作品集（套装6册）',
            '奶酪与蛆虫',
            '陋规：明清的腐败与反腐败',
            '发现阴阳道',
            '那些特别善于表达自己观点的女人们',
            '秦制两千年',
            '岩田先生',
            '犹太人三千年简史',
            '宫部美雪精选系列套装（全套9册）',
            ' 唐才子传（作家榜经典文库 ）',
            '国学大书院（套装40册）',

        ]
    }
},
};
</script>

<style lang="less" scoped>
#hot-recommend {
    width: 21vw;
    margin-left: 20px;
    .hot-tag {
        padding: 15px;
        background: white;
        .title {
            font-weight: bold;
            padding-bottom: 15px;
            border-bottom: 1px solid;
        }
        .list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 15px;
            justify-content: space-between;
            .item {
                // margin-right: 10px;
                color: white;
                background: rgb(141, 205, 141);
                margin-bottom: 5px;
                padding: 5px;
                &:hover {
                    cursor: pointer;
                    color: greenyellow;
                }
                &:nth-child(odd) {
                    background: rgb(228, 135, 132);
                }
            }
        }
    }

    .recent-article {
        margin-top: 20px;
        padding: 15px;
        background: white;
        .title {
            font-weight: bold;
            padding-bottom: 15px;
            border-bottom: 1px solid;
        }
        .list {
            .item {
                height: 50px;
                line-height: 50px;
                border-bottom: 1px dashed #eaeaea;
                font-size: 14px;
                &:hover {
                    cursor: pointer;
                    color: #00a67c;
                }
            }
        }
    }
}
</style>
