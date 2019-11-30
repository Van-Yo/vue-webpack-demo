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
import { mapMutations, mapGetters } from 'vuex';
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
    computed: {
    // mix the getters into computed with object spread operator
        ...mapGetters('birdge', ['GET_PAYSTATUS','GET_CARTLIST'])
    },
    methods: {
        goToDetail(){
            Storage.setMemberInfo(this.info);
            this.$router.push('/member/detail');
        },
        getAge(){
            let newAge = this.baseUtils().getAge('1993-02-07');
            console.log(newAge);
        }
    },
    components: {},
    created(){
        this.getAge();
        // console.log(this.GET_CARTLIST);
        // console.log(this.GET_PAYSTATUS);
        console.log(this.$store.state.birdge);
    }
};
</script>

<style lang="scss" scoped>
.member-info-area{
    .container{
        @include com-container;
    }
}
</style>
