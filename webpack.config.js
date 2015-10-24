'use strict';

var webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    entry: {
        app: './app.js',
        vendor: [
            'react',
            'react-dom',
            'lodash',
            'redux',
            'react-redux'
        ]
    },

    output: {
        filename: "app.js",
        path: __dirname + "/static"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel?optional[]=runtime'
            },
            {
                // Reference: https://github.com/webpack/file-loader
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },

        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "lib.js")
    ],

    watch: true,
    debug: true,

    devtool: "#eval-source-map"
};