<template>
<div class="demo-detail">
    <navbar>
        <icon slot="left" type="left" @click.native="back"> 返回</icon>
        <span>详情</span>
    </navbar>
    详情页
</div>
</template>

<script>
import Navbar from 'global/components/navbar'
import Icon from 'global/components/icon'

export default {
    name: 'demo-detail',
    components: {
        Navbar,
        Icon
    },
    methods: {
        back () {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="sass">
.demo-detail {

}
</style>
