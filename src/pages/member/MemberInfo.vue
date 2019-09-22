<template>
    <section class="member-info-area">
        <div class="container">
            <p>会员</p>
            <p>姓名：{{info.name}}</p>
            <p>会员等级：{{info.grade}}</p>
            <button @click="goToDetail()">详情</button>
        </div>
        <FooterBar></FooterBar>
    </section>
</template>

<script>
import Storage from '@utils/storage.js';
export default {
    data() {
        return {
            info:{
                name:'vanyo',
                age:18,
                grade:5,
                tel:'13811111111'
            }
        };
    },
    methods: {
        goToDetail(){
            Storage.setMemberInfo(this.info);
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
