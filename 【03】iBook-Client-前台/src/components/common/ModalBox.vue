<template>
    <div id="modal" v-show="isShow">
        <div class="content">
            <div class="title">
                <span>soBook</span>
            </div>
            <div class="pay_code">
                <div>
                    <img src="~@/assets/img/pay_code.png" alt="" />
                </div>
            </div>
            <div class="desc">扫码打赏，你说多少就多少</div>
            <div class="pay_method">
                <img
                    src="https://www.17sucai.com/preview/238033/2016-06-03/dashang1/img/alipay.jpg"
                />
            </div>
            <div class="info">
                <p>打开支付宝扫一扫，即可进行扫码打赏哦</p>
                <p>Powered by soBook， 分享从这里开始，精彩与您同在</p>
            </div>
            <div class="close" @click="closeClick">
                <i class="el-icon-error"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean,
        }
    },
    methods: {
        closeClick() {
            this.$emit('closeClick')
        }
    },
};
</script>

<style lang="less" scoped>
#modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(180, 180, 180, 0.7);
    .content {
        position: relative;
        width: 500px;
        height: 500px;
        background: whitesmoke;
        text-align: center;
        .title {
            color: white;
            margin: 30px 0;
            span {
                padding: 8px 7px;
                background: rgb(181, 171, 113);
                border-radius: 510px;
            }
        }
        .pay_code {
            img {
                border: 1px solid;
                width: 250px;
                height: 250px;
            }
            margin-bottom: 10px;
        }
        .pay_method {
            margin: 20px 0;
        }
        .info {
            font-size: 13px;
            color: #666;
        }
        .close {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(20px, -25px);
            font-size: 50px;
            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
