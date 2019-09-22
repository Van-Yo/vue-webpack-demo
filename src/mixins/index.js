import baseUtils from '@utils/baseUtils.js';
const mixin = {
    created(){
    },
    data(){
        return{
        };
    },
    methods:{
        /**
         * 工具类
         * 使用方法：this.baseUtils().方法
         * 例如：this.baseUtils().getAge(birth)
        */
        baseUtils(){
            return baseUtils;
        }
    }
};
export default mixin;