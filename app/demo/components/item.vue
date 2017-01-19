<template>
<div class="demo-item">
    <img class="item-img" :src="item.img">
    <div class="item-info">
        <div>{{item.desc}}</div>
        <div class="item-btn-group">
            <btn type="primary" size="sm" @click.native="buy">
                <icon type="shopping-cart"> 购买</icon>
            </btn>
            <btn type="outline" size="sm" @click.native="like">
                <icon type="heart-o"> 点赞</icon>
            </btn>
        </div>
    </div>
</div>
</template>

<script>
import Btn from 'global/components/btn'
import Icon from 'global/components/icon'

export default {
    name: 'demo-item',
    components: {
        Btn,
        Icon
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    methods: {
        // 购买
        buy () {
            console.log('buy--->', this.item)
            this.$router.push({ name: 'detail' })
        },
        // 点赞
        like () {
            console.log('like--->', this.item)
        }
    }
}
</script>

<style lang="sass">
@import '~sitestyle/base.scss';

.demo-item {
    display: flex;
    height: auto;
    margin: 16px;
    padding: 12px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .3);

    .item-img {
        width: 200px;
        flex: none;
        height: 150px;
        align-self: center;
    }

    .item-info {
        display: flex;
        flex: auto;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 12px;
    }

    .item-btn-group {
        display: flex;
        justify-content: flex-end;

        .vx-btn {
            margin: 0 12px;
        }
    }
}
</style>
