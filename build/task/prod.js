/**
 * 产品
 */
import webpack from 'webpack'

import webpackConfig from '../webpack.config.prod'

webpack(webpackConfig, function (err, stats) {
    if (err) {
        throw err
    }
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(stats.toString({
        colors: true,
        hash: false,
        version: true,
        timings: true,
        assets: true,
        chunks: false,
        children: false
    }))

    if (stats.hasErrors() || stats.hasWarnings()) {
        return
    }

    // TODO: 集成发版
})
