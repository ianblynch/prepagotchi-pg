// const pkg = require('./package.json')
// const path = require('path')
// const WrapperPlugin = require('wrapper-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const TerserPlugin = require('terser-webpack-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// const isProd = process.env.NODE_ENV === 'production'

// const { paths, localIdentName } = pkg.config

// const TEMPLATE_START = `function startBundle () {
// `
// const TEMPLATE_END = `
// }
// var app = {
//   initialize: function () {
//     this.bindEvents()
//   },
//   bindEvents: function () {
//     document.addEventListener('deviceready', this.onDeviceReady, false)
//   },
//   onDeviceReady: function () {
//     app.receivedEvent('deviceready')
//     startBundle()
//   },
//   receivedEvent: function (id) { }
// }

// `

// module.exports = [
//     {
//         mode: isProd ? 'production' : 'development',
//         entry: path.join(__dirname, paths.jsEntryPoint),
//         output: {
//             filename: paths.jsBundleName,
//             path: path.join(__dirname, paths.destApp),
//         },
//         module: {
//             rules: [
//                 {
//                     test: /\.js$/,
//                     exclude: /node_modules/,
//                     use: ['babel-loader'],
//                 },
//                 {
//                     test: /\.css$/,
//                     exclude: /node_modules/,
//                     use: [
//                         MiniCssExtractPlugin.loader,
//                         {
//                             loader: 'css-loader',
//                             options: {
//                                 modules: true,
//                                 importLoaders: 1,
//                                 localIdentName: localIdentName,
//                             },
//                         },
//                         'postcss-loader',
//                     ],
//                 },
//                 {
//                     test: /\.woff2$/,
//                     use: {
//                         loader: 'url-loader',
//                         options: {
//                             limit: 50000,
//                         },
//                     },
//                 },
//                 {
//                     test: /\.(jpg|png|svg)$/,
//                     loader: 'file',
//                     include: './assets/img'
//                 }
//             ],
//         },
//         plugins: [
//             new WrapperPlugin({
//                 test: /\.js$/,
//                 header: TEMPLATE_START,
//                 footer: TEMPLATE_END,
//             }),
//             new MiniCssExtractPlugin({
//                 filename: paths.cssBundleName,
//             }),
//         ],
//         optimization: {
//             minimizer: [
//                 new TerserPlugin({
//                     cache: true,
//                     parallel: true,
//                     sourceMap: false,
//                 }),
//                 new OptimizeCSSAssetsPlugin({}),
//             ],
//         },
//     },
// ]

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            // this will apply to both plain `.css` files
            // AND `<style>` blocks in `.vue` files
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file',
                include: './assets/img',
            },
        ],
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
    ],
}
