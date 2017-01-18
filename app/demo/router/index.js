import routes from './routes'

const router = new VueRouter({
    // mode: 'hash',
    mode: 'history',
    // base: __dirname,
    routes
})

export default router
