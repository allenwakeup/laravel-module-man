<template>
    <a-icon :style="{fontSize: '1.6em'}" :type="n % 2 === 0 ? 'fullscreen' : 'fullscreen-exit'" @click="toggle" />
</template>

<script>

export default {

    data() {
        return {
            n: 0
        };
    },
    computed: {},
    methods: {
        toggle(){
            this.n ++;
            if(this.n % 2 === 1){
                this.setWindowFullScreen();
            } else {
                this.windowExitFullScreen();
            }
        },
        //启动全屏
        setWindowFullScreen() {
            let docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
        },
        //退出全屏
        windowExitFullScreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
};
</script>
<style lang="scss" scoped>

</style>
