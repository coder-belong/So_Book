<template>
    <div id="notify">
        <i class="el-icon-mic"></i>
        <span>{{ notify }}</span>
    </div>
</template>

<script>
export default {
    props: {
        notify: {
            type: String
        }
    },
    data() {
        return {

        }
    },
};
</script>

<style lang="less" scoped>
#notify {
    background: rgb(251,251,251);
    padding: 10px;
    margin-bottom: 15px;
    i {
        margin-right: 10px;
        font-size: 22px;
        font-weight: bold;
        color: #666666;
    }
    span {
        color: #666666;
    }
}
</style>
