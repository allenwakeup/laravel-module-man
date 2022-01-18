<script>

    import { createNamespacedHelpers } from 'vuex'
    import { STORE_ADMIN_COMMON, STORE_ADMIN_LOGIN } from '@/plugins/constant'

    const adminLoginStore = createNamespacedHelpers(STORE_ADMIN_LOGIN)
    const adminCommonStore = createNamespacedHelpers(STORE_ADMIN_COMMON)

    export default {

        computed: {
            ...adminLoginStore.mapGetters([
                'isLogin',
                'userInfo',
                'token'
            ]),
            ...adminCommonStore.mapGetters({
                sysWindowHeight: 'height',
                sysIsBusy: 'isBusy',
                userPref: 'pref',
            }),
        },
        methods: {
            ...adminCommonStore.mapActions({
                setSysBusy: 'gettingBusy', // 设置系统是否繁忙
                setUserPrefs: 'setPref', // 设置用户偏好
            }),
            ...adminLoginStore.mapActions({
                updateUserInfo: 'update', // 更新用户信息
            }),

            /**
             * 设置用户偏好键值
             *
             * @param key
             * @param value
             */
            setUserPref(key, value){
                if(typeof key === 'string'){
                    const pref = {};
                    pref[key] = value;
                    this.setUserPrefs(pref);
                } else {
                    console.error('unable to set user preference value with key', key)
                }
            }
        }
    };
</script>
