<template>
    <section class="member-detail-area">
        <div class="container">
            会员详情
        </div>
        <FooterBar></FooterBar>
    </section>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {},
    components: {}
};
</script>

<style lang="scss" scoped>
.member-detail-area{
    .container{
        @include com-container;
        color: red;
    }
}
</style>
