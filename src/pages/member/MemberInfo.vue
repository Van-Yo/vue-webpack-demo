<template>
    <section class="member-info-area">
        <div class="container">
            <p @click="goToDetail()">会员</p>
        </div>
        <FooterBar></FooterBar>
    </section>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        goToDetail(){
            this.$router.push('/member/detail');
        }
    },
    components: {}
};
</script>

<style lang="scss" scoped>
.member-info-area{
    .container{
        @include com-container;
    }
}
</style>
