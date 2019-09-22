<template>
    <div class="footer-bar">
        <ul class="flex">
            <li class="flex-1">
                <img src="@assets/img/components/home.png">
                首页
            </li>
            <li class="flex-1"><img src="@assets/img/components/crown.png">会员</li>
            <li class="flex-1"><img src="@assets/img/components/list.png">订单</li>
            <li class="flex-1"><img src="@assets/img/components/man-user.png">我的</li>
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
