import App from './app'
import router from './router'

// 使用插件
Vue.use(VueRouter)
Vue.use(VueResource)

// 暂时用event-bus进行跨组件通信，大型项目请考虑用vuex
const eventBus = new Vue()
Vue.mixin({
    beforeCreate () {
        this.eventBus = eventBus
    }
})

const app = new Vue({
    router,
    ...App
})

app.$mount('#app')
