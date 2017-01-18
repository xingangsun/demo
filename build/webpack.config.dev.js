import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-build-notifier'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import HappyPack from 'happypack' // 我们现在不用这个重新构建速度就很快

import eslintFriendlyFormatter from 'eslint-friendly-formatter'
import chalk from 'chalk'
import autoprefixer from 'autoprefixer'
import postcssPxtorem from 'postcss-pxtorem'

import { entry_vender, entry_main, alias, provide } from './config'

const entry  = Object.assign({}, entry_vender, entry_main)

export default {
    context: `${process.cwd()}/app`,
    entry,
    // devtool: false,
    devtool: 'cheap-module-eval-source-map',
    // devtool: 'source-map',
    output: {
        path: `${process.cwd()}/dist`,
        publicPath: '',
        filename: 'js/[name].js',
        chunkFilename: '[id].[chunkhash].js' // 非入口文件的命名规则
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias
    },
    module: {
        preLoaders: [{
            test: /\.(vue|js)$/,
            exclude: /node_modules/,
            loader: 'eslint'
        }],

        loaders: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel?cacheDirectory'
        }, /*{
            test: /\.s?css$/,
            loaders: ['vue-style', 'css?sourceMap', 'postcss', 'sass?sourceMap']
        }, */{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?|iconfont.svg$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'fonts/[name].[ext]'
            }
        }]
    },
    eslint: {
        formatter: eslintFriendlyFormatter
    },
    vue: {
        postcss: [
            autoprefixer({
                browsers: ['last 2 versions', 'iOS >= 7', 'Android >= 4']
            }),
            // 肯定最好是用postcss，flexible布局生成了太多的[dpr-*]样式，所以不考虑用了，用pxtorem代替（注意：不同于px2rem）
            // https://github.com/cuth/postcss-pxtorem
            postcssPxtorem({
                rootValue: 100,
                unitPrecision: 5,
                propWhiteList: [],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 0
            })
        ],
        loaders: {
            sass: 'vue-style!css?sourceMap!sass?sourceMap'
        }
    },
    plugins: [
        new ProgressBarPlugin({
            format: `${chalk.bold('[:bar]')} ${chalk.cyan.bold(':percent (:elapseds)')} :msg`,
            clear: true,
            summary: false,
            summaryContent: false,
            customSummary (buildTime) {
                process.stdout.write(`=====${chalk.green.bold(`[ built in ${buildTime} ]`)}=====`)
            }
        }),
        // https://github.com/RoccoC/webpack-build-notifier
        new WebpackNotifierPlugin({
            title: '开发服务器',
            logo: 'app/global/img/logo.png',
            successSound: 'Submarine',
            failureSound: 'Glass',
            suppressSuccess: true
        }),

        new webpack.ProvidePlugin(provide),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            },
            __DEV__: true,
            __PROD__: false
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity // 不需要抽取公共代码到这个文件中
        }),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'demo'],
            filename: 'index.html',
            template: '../site/template/app-flex.html',
            // favicon: '',
            inject: true
        })
    ]
}
