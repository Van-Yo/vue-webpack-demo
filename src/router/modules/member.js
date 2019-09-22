const memberModule = [
    {
        path: '/member',
        component: () => import(/* webpackChunkName: "member" */'@pages/member/MemberInfo.vue'),
        meta: {
            title: '会员'
        }
    },
    {
        path: '/member/detail',
        component: () => import(/* webpackChunkName: "member" */'@pages/member/MemberDetail.vue'),
        meta: {
            title: '会员详情'
        }
    },
];
export default memberModule;