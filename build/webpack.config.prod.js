import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-build-notifier'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ZipWebpackPlugin from 'zip-webpack-plugin'

import eslintFriendlyFormatter from 'eslint-friendly-formatter'
import chalk from 'chalk'
import autoprefixer from 'autoprefixer'
import postcssPxtorem from 'postcss-pxtorem'
import postcssClean from 'postcss-clean'

import { entry_vender, entry_main, alias, provide } from './config'

const entry  = Object.assign({}, entry_vender, entry_main)

export default {
    context: `${process.cwd()}/app`,
    entry,
    devtool: false,
    output: {
        path: `${process.cwd()}/dist`,
        publicPath: '',
        filename: 'js/[name].[chunkhash:7].js',
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
                name: 'img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?|iconfont.svg$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'fonts/[name].[hash:7].[ext]'
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
            // https://github.com/ben-eb/cssnano
            /*cssnano({ // just used in production
                safe: true
            }),*/
            postcssClean(),
            // https://github.com/hail2u/node-css-mqpacker
            // cssMqpacker(),
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
            sass: ExtractTextPlugin.extract('css!sass', {
                publicPath: '../'
            })
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
        new WebpackNotifierPlugin({
            title: '打包完成',
            logo: 'app/global/img/logo.png',
            successSound: 'Submarine',
            failureSound: 'Glass',
            suppressSuccess: true
        }),

        new CleanWebpackPlugin(['dist', 'zip'], {
            root: `${process.cwd()}`,
            verbose: false
        }),
        // https://github.com/erikdesjardins/zip-webpack-plugin
        new ZipWebpackPlugin({
            path: '../zip', //relative (to Webpack output path)
            filename: 'demo.zip'
        }),

        new webpack.ProvidePlugin(provide),
        // http://vue-loader.vuejs.org/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            __DEV__: false,
            __PROD__: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),

        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity // 不需要抽取公共代码到这个文件中
        }),

        // https://github.com/webpack/extract-text-webpack-plugin
        new ExtractTextPlugin('css/[name].[contentHash:7].css', {
            allChunks: true
        }),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'demo'],
            filename: 'index.html',
            template: '../site/template/app-flex.html',
            // favicon: '',
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true
            }
        })
    ]
}
