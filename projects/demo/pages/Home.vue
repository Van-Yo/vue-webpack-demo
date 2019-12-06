<template>
    <section class="home-area">
        <div class="container">
            <div class="book-list">
                <ul>
                    <li v-for="item in booksList" :key="item.index">
                        <p>书名：{{item.name}} 作者：{{item.author}} 简介：{{item.brief}}</p>
                    </li>
                </ul>
            </div>
            <Nodata :showFlag="booksList.length"></Nodata>
        </div>
        <FooterBar></FooterBar>
    </section>
</template>

<script>
import HomeRequest from '@requests/modules/homeRequest.js';
import { mapMutations, mapGetters } from 'vuex';
export default {
    data() {
        return {
            booksList:[]
        };
    },
    computed: {
        ...mapGetters('birdge', ['GET_PAYSTATUS','GET_CARTLIST'])
    },
    methods:{
        ...mapMutations('birdge',['SET_PAYSTATUS','SET_CARTLIST'])
    },
    created(){
        // console.log(ENV);
        HomeRequest.findBooksRequest({searchString:'大'}).then( res => {
            if(res.data && res.data.length){
                this.booksList = res.data;
            }
        });
        /* this.addBookData([{name:'水浒传'}]).then(res=>{
            console.log(res);
        });
        console.log(this.GET_CARTLIST); */
        // this.SET_CARTList([{name:'水浒传'}]);
        // console.log(this.getCartList);
        this.SET_PAYSTATUS('2');
        this.SET_CARTLIST({name:'红楼梦',price:25,num:2})
        console.log(this.$store.state.birdge);
        // console.log(this.GET_CARTLIST);
        
    },
};
</script>

<style lang="scss" scoped>
.home-area{
    .container{
        @include com-container;
    }
}
</style>
