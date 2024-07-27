// 配置开发环境

const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const devWebPackConfig = merge(baseWebpackConfig, {
    // 这里是开发环境的配置
    mode: "development",
    plugins: [

        // 根据不同的环境，注入不同的全局变量
        new webpack.DefinePlugin({
            // 开发环境下的接口地址
            // 变量后面的值，是一段代码片段
            API_BASE_URL: JSON.stringify('http://apidev.example.com')
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',  // 生成的HTML文件名，位置默认在output.path中
        }),
    ]
});

module.exports = devWebPackConfig;