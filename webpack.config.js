const webpack           = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer      = require('autoprefixer');
const precss            = require('precss');
const Clean             = require('clean-webpack-plugin');
const path              = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/** @type {boolean} */
const production = process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production';

/** @type {string[]} */
const sassLoaders = [
    'css-loader?sourceMap',
    'postcss-loader',
    'sass-loader?sourceMap'
];

//noinspection JSUnusedGlobalSymbols,JSUnresolvedFunction
module.exports = {
    entry: {
        app: './src/index.js'
    },

    devtool: 'source-map',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: production ? 'js/[name][hash].js' : 'js/[name].js',
        publicPath: production ? '/' : '/dist/'
    },

    module: {
        loaders: [
            {
                test: /\.es6?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },

            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },

            {
                test: /fonts\/.+\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=fonts/[name].[ext]'
            },

            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file?name=images/[name].[ext]"
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
            },

            {
                test: /\.html$/,
                loader: "file-loader?name=[path][name].[ext]&context=./src!extract-loader!html-loader",
                excludes: /partials/
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.es6', 'jsx']
    },

    plugins: [
        new Clean(['./dist']),
        new ExtractTextPlugin("css/styles.css", { allChunks: true }),
        new CopyWebpackPlugin([
            {from: './src/images', toType: 'dir', to: 'images'}
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],

    sassLoader: {
        includePaths: [ 'src/css' ]
    },

    postcss: function() {
        return {
            defaults: [ precss, autoprefixer ],
            cleaner:  [ autoprefixer({ browsers: ['last 2 versions'] }) ]
        };
    },

    devServer: { inline: true }

};
