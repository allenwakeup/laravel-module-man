<template>

    <a-layout class="admin_index_main">

        <!-- 菜单 start -->
        <a-layout-sider v-if="!subMenu" class="admin_menu" v-model="collapsed" :trigger="null" collapsible>
            <div class="base_shadow admin_menu_title"><span :class="collapsed?'hiddens':'shows'">生产制造</span></div>
            <a-menu mode="inline" theme="dark" :default-selected-keys="defaultSelectedKeys" :open-keys.sync="defaultOpenKeys">
                <a-menu-item @click="toNav('/Admin/index', 0)"><a-font class="afont menu_icon" type="icon-gc-home" /><span>系统首页</span></a-menu-item>
                <a-sub-menu v-if="v.is_type >= 100" v-for="v in menus" :key="v.id + ''">
                    <span slot="title"><a-font class="afont menu_icon" :type="v.icon||'icon-gc-home'" /><span>{{v.name}}</span></span>
                    <template v-for="vo in (v.children||[])">
                        <a-menu-item v-if="$isEmpty(vo.children) || vo.children.length===0" :key="vo.id + ''"  @click="toNav(vo.link, vo.id)"><a-font class="afont menu_icon" v-if="!!vo.icon" :type="vo.icon" />{{vo.name}}</a-menu-item>
                        <a-sub-menu v-else :key="vo.id + ''">
                            <span slot="title"><a-font :type="vo.icon"></a-font><span>{{vo.name}}</span></span>
                            <a-menu-item  @click="toNav(vo2.link, vo2.id)" v-for="vo2 in (vo.children||[])" :key="vo2.id + ''">
                                <a-font :type="vo2.icon"></a-font>{{vo2.name}}</a-menu-item>
                        </a-sub-menu>
                    </template>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <!-- 菜单 end -->

        <!-- 右侧内容 start -->
        <a-layout class="admin_right_content">
            <a-layout-header :class="subMenu?'admin_right_top mobile':(collapsed?'admin_right_top small':'admin_right_top')">
                <div v-if="subMenu" class="admin_menu_title item_left float_left"></div>
                <a-icon class="base_font_size item_left float_left" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapsed"/>
                <div class="top-menu">
                    <a-menu v-if="topMenus.length > 0" mode="horizontal">
                        <a-menu-item @click="toNav(t.link, t.id)" v-for="t in topMenus" :key="t.id"><a-font class="afont menu_icon" v-if="!!t.icon" :type="t.icon" />{{t.name}}</a-menu-item>
                    </a-menu>
                </div>
                <div class="item_right float_right">
                    <div class="menu_right_content">
                        <div class="quick_btns">
                            <fullscreen class="quick_btn"/>
                        </div>
                        <a-dropdown class="dropdown_right" overlayClassName="person_menu">
                            <div class="admin_top_person" @click="e => e.preventDefault()">
                                <a-icon  v-show="isBusy" type="loading" class="icon-busy" />
                                <a-avatar v-show="!isBusy" class="avatar" size="small" icon="user" :src="userInfo.avatar"/>
                                <a-icon type="down" />
                            </div>
                            <a-menu slot="overlay">
                                <a-menu-item key="0" @click="toNav('/Admin/index', 0)">
                                    <a-icon type="home" />
                                    <span>系统首页</span>
                                </a-menu-item>
                                <a-menu-item key="1" @click="logout">
                                    <a-icon style="color:red" type="logout" />
                                    <span style="color:red">退出后台</span>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>
                </div>
                <div class="clear"></div>
                <a-progress v-if="isBusy"
                    class="progress-bar"
                    :show-info="false"
                    :stroke-width="5"
                    :stroke-color="{
                        from: '#108ee9',
                        to: '#87d068',
                    }"
                    :percent="progressBar.percent"
                    status="active"
                />
            </a-layout-header>

            <!-- 主体内容 -->
            <a-layout-content>
                <div :class="subMenu?'admin_content_view clear_m':'admin_content_view'" v-if="!isAdminDefault">
                    <transition name="slide-fade">
                        <router-view v-if="isRefresh"></router-view>
                    </transition>
                </div>
                <div :class="subMenu?'admin_content_view2 clear_m':'admin_content_view2'" v-if="isAdminDefault">
                    <transition name="slide-fade">
                        <router-view v-if="isRefresh"></router-view>
                    </transition>
                </div>
            </a-layout-content>
        </a-layout>
        <!-- 右侧内容 end -->

        <!-- 手机菜单 start -->
        <a-drawer :body-style="{ padding: 0, height: '100%' }" placement="left" :closable="false" :visible="drawerShow" @close="onClose">
            <div class="admin_menu mobile">
                <div class="admin_menu_title"><span :class="'shows'">生产制造</span></div>
                <a-menu mode="inline" theme="dark">
                    <a-menu-item @click="toNav('/Admin/index')"><a-font class="afont menu_icon" type="icon-gc-home" /><span>系统首页</span></a-menu-item>
                    <a-sub-menu v-for="v in menus" :key="v.id">
                        <span slot="title"><a-font class="afont menu_icon" :type="v.icon||'icon-gc-home'" /><span>{{v.name}}</span></span>
                        <template v-for="vo in (v.children||[])">
                            <a-menu-item v-if="$isEmpty(vo.children) || vo.children.length===0" :key="vo.id"  @click="toNav(vo.link)"><a-font class="afont menu_icon" v-if="!!vo.icon" :type="vo.icon" />{{vo.name}}</a-menu-item>
                            <a-sub-menu v-else :key="vo.id">
                                <span slot="title"><a-font class="afont menu_icon" v-if="!!vo.icon" :type="vo.icon" /><span>{{vo.name}}</span></span>
                                <a-menu-item  @click="toNav(vo2.link)" v-for="vo2 in (vo.children||[])" :key="vo2.id"><a-font class="afont menu_icon" v-if="!!vo2.icon" :type="vo2.icon" />{{vo2.name}}</a-menu-item>
                            </a-sub-menu>
                        </template>
                    </a-sub-menu>
                </a-menu>
            </div>
        </a-drawer>
        <!-- 手机菜单 end -->
    </a-layout>



</template>

<script>
import Fullscreen from '@/components/fullscreen'
import { createNamespacedHelpers } from 'vuex'
import { STORE_ADMIN_LOGIN, STORE_ADMIN_COMMON } from '@/plugins/constant'
import { getMenuPathById } from '@/plugins/function'

const adminLoginStore = createNamespacedHelpers(STORE_ADMIN_LOGIN)
const adminCommonStore = createNamespacedHelpers(STORE_ADMIN_COMMON)

export default {
    components: { Fullscreen },
    props: {},
    data() {
        return {
            isAdminDefault:false, // 默认页面
            collapsed:false,
            subMenu:false,
            drawerShow:false,
            screenWidth: document.body.clientWidth, // 屏幕宽度
            menus:[],
            isRefresh:true,
            defaultOpenKeys: [],
            progressBar: {
                percent: 0,
                interval: -1
            },
            topMenus: []
        };
    },
    provide () {
        return {
            reload: this.reload
        }
    },
    watch: {
        isBusy(oldVal, newVal ){
            if(newVal){
                this.progressBar.percent = 0;
                this.clearProgressInterval();
            }
            if(oldVal){
                this.progressBar.interval = window.setInterval(() => {
                    this.progressBar.percent = Math.min(100, this.progressBar.percent + Math.ceil(Math.random()*10));
                    if(this.progressBar.percent === 100){
                        window.setTimeout(() => {
                            // 5秒钟后 强制关闭
                            this.clearProgressInterval();
                            // 重置状态
                            this.setTopBusy(false);
                        }, 5000)
                    }
                }, 1000)
            }
        }
    },
    computed:{
        ...adminLoginStore.mapGetters([
            'isLogin',
            'userInfo'
        ]),
        ...adminCommonStore.mapGetters([
            'pref',
            'isBusy'
        ]),
        defaultSelectedKeys() {
            return this.pref.menu && this.pref.menu.selected ? this.pref.menu.selected : []
        }
    },
    methods: {
        ...adminLoginStore.mapActions({
            storeLogout: 'logout'
        }),
        ...adminCommonStore.mapActions({
            selectMenu: 'selectMenu',
            setTopBusy: 'gettingBusy',
            setHeight: 'setHeight'
        }),
        // 收缩菜单
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
            if(this.subMenu){
                this.drawerShow = !this.drawerShow;
            }
        },
        onClose() {
            this.drawerShow = false;
        },
        getMenus(){
            this.setTopBusy(true);
            this.$get(this.$api.adminMenus).then(res=>{
                if(res.code === 200){
                    if(window.menuType){
                        const menus = res.data.filter(menu => menu.is_type === window.menuType);
                        if(menus && menus.length > 0){
                            this.menus = menus[0].children;
                        }
                    }else{
                        this.menus = res.data;
                    }

                    this.topMenus = res.data.filter(menu => menu.is_type > 100);

                    if(this.pref.menu){
                        if(!this.$isEmpty(this.pref.menu.route)){
                            if(this.$route.path !== this.pref.menu.route){
                                this.setTopBusy(false);
                                this.$router.push(this.pref.menu.route);
                            }
                        }
                        if(this.pref.menu.selected && this.pref.menu.selected.length > 0){
                            this.defaultOpenKeys = this.pref.menu.selected;
                        }
                    }
                }
                this.setTopBusy(false);
            }, e => this.setTopBusy(false));
        },
        toNav(path, id){
            const that = this;

            this.$hasRoute(this.$router, {path})
                .then(resolved_routes => {
                    that.reload()
                    that.selectMenu({
                        selected: getMenuPathById(that.menus, id),
                        route: path
                    })
                    that.$router.push(path);
                }).catch(e => {
                    console.log('路由不存在' + path)
                    that.selectMenu({
                        selected: getMenuPathById(that.menus, id),
                        route: path
                    })
                    window.location.href = path;
                });
        },
        clearProgressInterval(){
            if(this.progressBar.interval > 0){
                window.clearInterval(this.progressBar.interval)
            }
        },
        // 判断是否宽度小于多少
        onScreenWidth(){
            if(this.screenWidth<=950 && this.screenWidth>=576){
                this.collapsed = true;
                this.subMenu = false;
                this.drawerShow = false;
            }else if(this.screenWidth<576){
                this.collapsed = true;
                this.subMenu = true;
            }else{
                this.collapsed = false;
                this.subMenu = false
                this.drawerShow = false;
            }
        },
        reload () {
            this.isRefresh= false
            this.$nextTick(function () {
                this.isRefresh= true
            })
        },
        // 退出后台
        logout(){
            const vm = this;
            this.$get(this.$api.adminLogout).then(res=>{
                this.$message.success(res.msg);

                vm.storeLogout();
                setTimeout(function() {window.location.href = '/Admin/login';}, 1000);

            })
        },

    },
    created() {
        this.getMenus();
        // console.log(this.$route.name)
        if(this.$route.name === 'goodcatch_m_man_default'){
            this.isAdminDefault = true;
        }else{
            this.isAdminDefault = false;
        }
    },
    mounted() {
        let _this = this
        this.onScreenWidth();
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                _this.screenWidth = window.screenWidth
                _this.onScreenWidth();
                this.setHeight(document.body.clientHeight);
            })()
        }
        this.setHeight(document.body.clientHeight);
    },
    beforeRouteUpdate (to, from, next) {
        // console.log(to,from);
        if(to.name === 'goodcatch_m_man_default'){
            this.isAdminDefault = true;
        }else{
            this.isAdminDefault = false;
        }
        next();
    },
    beforeDestroy() {
        this.clearProgressInterval();
    }
};
</script>
<style lang="scss" scoped>
.admin_index_main{
    height: 100%;
}
.admin_right_content{
    width: 100%;
    // transform: scale3d(1, 1, 1);
    // -ms-transform: scale3d(1, 1, 1);
    // -moz-transform: scale3d(1, 1, 1);
    // -webkit-transform: scale3d(1, 1, 1);
    position: relative;
    background: #efefef;
    &:after{
        display: block;
        clear: both;
        content:'';
    }
    .admin_right_top{
        padding: 0 0px;
        box-sizing: border-box;
        line-height: 50px;
        height: 50px;
        // width: 100%;
        width: calc(100% - 200px);
        position: fixed;
        z-index: 99;
        background: #fff;
        border-bottom: 1px solid #efefef;
        &:after{
            display: block;
            clear: both;
            content:'';
        }
        &.small{
            width: calc(100% - 82px);
        }
        &.mobile{
            width: 100%;
        }
        .item_left{
            line-height: 50px;
            width: 50px;
        }
        .item_right{
            justify-content:flex-end;
            margin-right: 15px;
            .menu_right_content{
                width: 90px;
                .quick_btns {
                    float:left;
                    line-height: 56px;

                    .quick_btn{
                        margin: 0 7px;

                    }
                }
                .dropdown_right {
                    float:right;
                }
            }
            .admin_top_person{
                cursor: pointer;
                .avatar{margin-top: -4px;margin-right: 4px;}
                .icon-busy {
                    margin-top: -4px;
                    margin-right: 4px;
                    font-size: 1.5em;
                    color: #13c2c2;


                }

            }


        }
        .top-menu{
            width: 70%;
            float: left;
        }

        .progress-bar{
            position:absolute;
            margin-top: -12px;
        }

    }
    .admin_content_view{
        position: relative;
        margin: 56px 10px 0 10px;
        padding: 15px 15px;
        background: #fff;
        // overflow: initial;
        border-radius: 4px;
        // height: calc(100vh - 64px);
        border:1px solid #e7eaec!important;
        &:after{
            content:'';
            clear:both;
            display: block;
        }
        &.clear_m{
            margin: 72px 0 22px 0;;
        }
    }
    .admin_content_view2{
        position: relative;
        margin: 45px 0 0 0;
        padding: 12px 0;
        // overflow: initial;
        height: auto;
        &:after{
            content:'';
            clear:both;
            display: block;
        }
        &.clear_m{
            margin: 72px 0 22px 0;;
        }
    }
}
.admin_menu{
    max-width: 230px;
    min-height: 100%;
    background: #111;
    .menu_icon{
        color:#fff!important;
    }
    &.mobile{
        width: 100%;
        max-width:100%;
    }
    .admin_menu_title{
        line-height: 80px;
        font-size: 20px;
        color:#fff;
        background: #231f1f;
        border-bottom: 2px solid #3d4f5e;
        text-align: center;

        img{
            height: 48px;
            margin-top: -5px;
        }
        span{
            color:#409EFF;
            &.hiddens{
                display: none;
            }
            &.shows{
                color:#fff;
                margin-left: 10px;
            }
        }
    }

    .ant-menu-item.ant-menu-item-selected {
        background: #409EFF;

    }

}

.icon-busy ::v-deep .anticon-spin {
    animation: loadingCircle 0.3s infinite linear;
    -webkit-animation: loadingCircle 0.3s infinite linear;
    -moz-animation: loadingCircle 0.3s infinite linear;
}
.person_menu {
    div.name {
        font-size: 1.2em;
        font-weight: bold;
        margin: 10px 10px 5px 10px;
    }

    div.account {
        font-size: 1em;
        padding: 0 50px 10px 10px;
    }
}
</style>
