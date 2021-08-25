<template>
    <div id="test"></div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
};
</script>

<style scoped>
#test {
    width: 500px;
    height: 500px;
    background: red;
}

@media screen and (max-width: 800px) {
    #test {
        background: blue;
    }
}
</style>
