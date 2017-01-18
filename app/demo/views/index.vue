<template>
<div class="demo-index">
    <toast :show="!bannerLoaded || !itemLoaded">
        <icon type="loading"> 正在加载中…</icon>
    </toast>
    <!-- navbar -->
    <navbar slot="header">
        <span><slot name="title">测试一下</slot></span>
        <icon slot="right" type="bars" @click.native=""></icon>
    </navbar>
    <!-- banner -->
    <swiper class="demo-banner" :loop="true" :autoplay="2500" :show-pagination="true">
        <swiper-slide v-for="banner of bannerList" @click="onSlideClick(banner)">
            <img :src="banner.img">
        </swiper-slide>
    </swiper>
    <!-- list -->
    <div class="demo-list">
        <item v-for="item of itemList" :item="item"></item>
    </div>
</div>
</template>

<script>
// import { Pull } from 'global/components/swiper'
import Navbar from 'global/components/navbar'
import Icon from 'global/components/icon'
import Toast from 'global/components/toast'
import { Swiper, SwiperSlide } from 'global/components/swiper'
import Item from '../components/item'

import api from '../api'

export default {
    name: 'demo-index',
    components: {
        Navbar,
        Icon,
        Toast,
        Swiper,
        SwiperSlide,
        Item
    },
    data () {
        return {
            bannerList: [], // 广告列表
            itemList: [], // 项目列表

            bannerLoaded: false, // loading
            itemLoaded: false // loading
        }
    },
    mounted () {
        this.loadData()
    },
    methods: {
        // 加载数据
        loadData () {
            this.$http.get(api('bannerList')).then(res => res.json()).then(data => {
                this.bannerList = data
                this.bannerLoaded = true
            })

            this.$http.get(api('itemList')).then(res => res.json()).then(data => {
                this.itemList = data
                this.itemLoaded = true
            })
        },
        // 点击广告
        onSlideClick (banner) {
            location.href = banner.url
        }
    }
}
</script>

<style lang="sass">
.demo-index {
    .demo-banner {
        // min-height: 300px;

        img {
            width: 100%;
        }
    }
}
</style>
