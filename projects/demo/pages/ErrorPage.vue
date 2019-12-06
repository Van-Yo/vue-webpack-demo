<template>
    <section class="error-page-area">
        <div class="container">
            <div class="nodata-box">
                <img src="@assets/img/404_bg.png">
            </div>
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
.error-page-area{
    .container{
        @include com-container;
        .nodata-box {
            width: 2rem;
            margin: 0.75rem auto;
        }
    }
}
</style>
