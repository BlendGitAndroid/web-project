// 配置生产环境

const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack')

const prodWebPackConfig = merge(baseWebpackConfig, {
    // 这里是开发环境的配置
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
            // 生产环境下的接口地址
            API_BASE_URL: JSON.stringify('http://apiprod.example.com')
        }),

        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',  // 生成的HTML文件名，位置默认在output.path中
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        // 压缩 CSS
        new OptimizeCssAssetsPlugin(),
    ]
});

module.exports = prodWebPackConfig;