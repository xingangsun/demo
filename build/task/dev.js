/**
 * 开发
 */
import express from 'express'
import ip from 'ip'
import chalk from 'chalk'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import httpProxyMiddleware from 'http-proxy-middleware'

import config from '../../config'
import webpackConfig from '../webpack.config.dev'

// webpack-hot-middleware/client
const hotclient = ['webpack-hot-middleware/client?noInfo=true&reload=true']
const entry = webpackConfig.entry
Object.keys(entry).forEach((name) => {
    const value = entry[name]
    if (Array.isArray(value)) {
        value.unshift(...hotclient)
    } else {
        entry[name] = [...hotclient, value]
    }
})
// console.log(entry)

const webpackCompiler = webpack(webpackConfig)
const devMiddleware = webpackDevMiddleware(webpackCompiler, {
    // serverSideRender: true,
    publicPath: webpackCompiler.options.output.publicPath,
    noInfo: true,
    quiet: false,
    stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        children: false
    }
})
const hotMiddleware = webpackHotMiddleware(webpackCompiler, {
    log: false
})

const devServer = express()

devServer.use(devMiddleware)
devServer.use(hotMiddleware)
// 代理API，可以在config/mine.js中修改成你想要的代理目标
devServer.use(httpProxyMiddleware('**/*.action', {
    logLevel: 'silent',
    target: config.proxyTarget,
    changeOrigin: true
}))

devServer.listen(config.devServerPort, function () {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(`dev-server at ${chalk.magenta.underline(`http://${ip.address()}:${this.address().port}`)}`)
})
