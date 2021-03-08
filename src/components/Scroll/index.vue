<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    name: 'Scroll',
    props: {
        handleToScroll: {
            type: Function,
            default: function(){}
        },
        handleToTouchEnd: {
            type: Function,
            default: function(){}
        }
    },
    mounted(){
        //不使用setTimeout会出现无法滚动，但是slot中的css样式渲染成功情况
        setTimeout(() => {
        var scroll = new BScroll( this.$refs.wrapper, {
                click: true,
                probeType: 1,
        });

        //实现下拉刷新功能
        scroll.on('scroll',(pos) => {
            this.handleToScroll(pos)
        });
        scroll.on('touchEnd',(pos) => {
            this.handleToTouchEnd(pos)
        })
        },800)
    }
}
</script>
<style lang="scss" scoped>
    .wrapper {
        height: 100%;
        width: 100%;
    }
</style>