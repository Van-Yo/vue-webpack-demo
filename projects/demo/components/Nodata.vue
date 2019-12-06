<template>
    <div class="nodata-box" v-if="nodataFlag">
        <img src="@assets/img/pic_empty.png">
    </div>
</template>
<script>
export default {
    data() {
        return {
            nodataFlag: this.showFlag || false
        };
    },
    props: ['showFlag'],
};
</script>
<style lang="scss" scoped>
.nodata-box {
    width: 2rem;
    margin: 0.75rem auto;
}
</style>