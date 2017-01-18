<template>
<div class="app">
    <!-- 侧栏菜单 -->
    <!-- 页面视图 -->
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="sass">
@import '~sitestyle/global.scss'; // 全局样式，只引入一次
@import '~global/fonts/iconfont.scss'; // 全局样式，只引入一次
@import '~sitestyle/base.scss';

.app {
    position: relative;
    min-height: 100%;
    padding-top: $navbar-height;

    .vx-navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
}
</style>
