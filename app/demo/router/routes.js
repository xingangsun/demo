import Index from '../views/index'
import Detail from '../views/detail'

export default [{
    path: '/', // 首页
    name: 'index',
    component: Index
}, {
    path: '/detail', // 详情页
    name: 'detail',
    component: Detail
}]
