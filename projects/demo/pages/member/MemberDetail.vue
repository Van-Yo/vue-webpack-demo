<template>
    <section class="member-detail-area">
        <div class="container">
            <p>会员详情</p>
            <p>姓名：{{info.name}}</p>
            <p>年龄：{{info.age}}</p>
            <p>等级：{{info.grade}}</p>
            <p>电话：{{info.tel}}</p>
        </div>
        <FooterBar></FooterBar>
    </section>
</template>

<script>
import Storage from '@utils/storage.js';
export default {
    data() {
        return {
            info:Storage.getMemberInfo(),
        };
    },
    methods: {},
    components: {}
};
</script>

<style lang="scss" scoped>
.member-detail-area{
    .container{
        @include com-container;
    }
}
</style>
