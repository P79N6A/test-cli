'use strict';
/*global __dirname */
const path = require('path');
const webpack = require('webpack');

const { VueLoaderPlugin } = require('vue-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlInjectPlugin = require('html-inject-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'production', //编译模式
    entry:{//入口文件
        history: ['@babel/polyfill' ,'./client/entries/history.js'],
        detail: ['@babel/polyfill' ,'./client/entries/detail.js'],
        apply: ['@babel/polyfill' ,'./client/entries/apply.js'],
        list: ['@babel/polyfill' ,'./client/entries/list.js'],
        '404': './client/entries/404.js'
    },
    resolve:{
        extensions: ['.js' , '.json' , 'vue'], //import引入时，无需写扩展名的文件
        alias: {
            // 'vue$': 'vue/dist/vue.runtime.esm.js' //运行时的vue
            'vue$': 'vue/dist/vue.esm.js' //完整版本的vue
        }
    },
    module:{
        rules:[{
            test:/\.js$/,
            exclude: /node_modules/,
            loader:'babel-loader', //js编译
            options: {
                presets: [['@babel/preset-env',{
                    useBuiltIns: 'entry'
                }]],
                plugins: [require('@babel/plugin-transform-runtime')]
            }
        },
        {
            test:/\.vue$/,
            include: [path.join(__dirname, './client/')],
            loader: 'vue-loader',
            options: {
                extractCSS: true
            }
        },
        {
            resourceQuery: /blockType=i18n/,
            loader: '@kazupon/vue-i18n-loader'
        },
        {
            test:/\.html?$/,
            loader: 'html-loader'
        },
        {
            test: /\.s?[ac]ss$/,//postcss-loader 依赖 postcss-config.js
            use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader'] 
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader'
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader'
        }]
    },
    watch: false,
    watchOptions: { //不监听目录
        ignored: [/node_modules/ , '/static/']
    },
    output:{
        filename:'[name]-[hash].js',
        path:path.resolve(__dirname , './static/dist'),
        publicPath:'//<%=ipoFutu5Static%>/dist/'
    },
    devtool: false,
    plugins:[
        new CleanWebpackPlugin([
            path.resolve(__dirname , './static/dist'),
            path.resolve(__dirname , './server/views')
        ]),
        new VueLoaderPlugin(),
        new HtmlInjectPlugin({
            filename: './../../server/views/apply.html',
            chunks:['apply'],
            crossorigin:'anonymous',
            template: path.resolve(__dirname , './client/views/apply.html')
        }),
        new HtmlInjectPlugin({
            filename: './../../server/views/history.html',
            chunks:['history'],
            crossorigin:'anonymous',
            template: path.resolve(__dirname , './client/views/history.html')
        }),
        new HtmlInjectPlugin({
            filename: './../../server/views/detail.html',
            chunks:['detail'],
            crossorigin:'anonymous',
            template: path.resolve(__dirname , './client/views/detail.html')
        }),
        new HtmlInjectPlugin({
            filename: './../../server/views/list.html',
            chunks:['list'],
            crossorigin:'anonymous',
            template: path.resolve(__dirname , './client/views/list.html')
        }),
        new HtmlInjectPlugin({
            filename: './../../server/views/404.html',
            chunks:['404'],
            template: path.resolve(__dirname , './client/views/404.html')
        }),
        new HtmlInjectPlugin({
            filename: './../../server/views/500.html',
            template: path.resolve(__dirname , './client/views/500.html')
        }),
        new OptimizeCssAssetsPlugin(),
        new MiniCssExtractPlugin({ //提取为外部css代码
            filename:'[name]-[contenthash].css'
        }),
        new UglifyJsPlugin({
            uglifyOptions:{
                compress: {
                    warnings: false,
                    drop_console: true
                }
            }
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};