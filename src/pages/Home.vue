<template>
    <section class="home-area">
        <div class="container">
            <Nodata :showFlag="true"></Nodata>
        </div>
        <FooterBar></FooterBar>
    </section>
</template>

<script>
export default {
    data() {
        return {};
    },
    created(){
        console.log(ENV);
    },
};
</script>

<style lang="scss" scoped>
.home-area{
    .container{
        @include com-container;
        padding-bottom: 0.48rem;
    }
}
</style>
