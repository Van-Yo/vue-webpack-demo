<template>
	<router-view></router-view>
</template>

<script>
import storage from '@utils/storage'
export default {
	data() {
		return {};
	},
	methods: {
		/**
		 * 桥数据关联
		 * 更新vuex数据，将本地数据同步到vuex里面的数据中
		 * 作用：防止刷新页面vuex中的数据初始化
		*/
		bridgeStorageToVuex(){
			let vuexBirdgeObj = this.$store.state.birdge;
			let storageBirdgeObj = storage.getBridgeData();
			this.$store.state.birdge = Object.assign(vuexBirdgeObj,storageBirdgeObj)
		}
	},
	components: {},
	created() {
		this.bridgeStorageToVuex();
	}
};
</script>

<style lang='scss' scoped>
</style>
