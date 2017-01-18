/**
 * 获得API
 *
 * # Usage
 * api(API名称)
 */
let basePath = ''
if (__DEV__) {
    basePath = 'http://api.zhongan.com/mock'
    basePath = 'http://localhost:3001/api'
}

const apiMap = {
    bannerList: '/banner/list', // 广告列表
    itemList: '/item/list', // 项目列表
    itemDetail: '/item/detail' // 项目详情
}

export default function (name) {
    return basePath + apiMap[name]
}
