<template>
    <section class="home-area">
        <div class="container">
            <Nodata :showFlag="true"></Nodata>
        </div>
        <FooterBar></FooterBar>
    </section>
</template>

<script>
import HomeRequest from '@requests/modules/homeRequest.js';
export default {
    data() {
        return {};
    },
    created(){
        console.log(ENV);
        HomeRequest.weatherSearch({city:'上海'}).then( res => {
            console.log(res);
        });
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
