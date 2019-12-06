<template>
    <div class="footer-bar">
        <ul class="flex">
            <router-link class="flex-1" to="/home" tag="li">
                <img src="@assets/img/components/home.png">
                首页
            </router-link>
            <router-link class="flex-1" to="/member"  tag="li"><img src="@assets/img/components/crown.png">会员</router-link>
            <router-link class="flex-1" to="/order-list"  tag="li"><img src="@assets/img/components/list.png">订单</router-link>
            <router-link class="flex-1" to="/personal-info"  tag="li"><img src="@assets/img/components/man-user.png">我的</router-link>
        </ul>
    </div>
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
.footer-bar{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: $c-fff;
    ul{
        li{
            display: flex;
	        flex-direction: column;
            text-align: center;
            padding: 0.07rem 0 0.03rem;
            img{
                width: 0.2rem;
                height: 0.2rem;
                margin: 0 auto;
                margin-bottom: 0.02rem;
            }
        }
    }
}
</style>
