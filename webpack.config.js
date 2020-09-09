const HtmlWebpackPlugin = require("html-webpack-plugin"),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    CopyPlugin = require('copy-webpack-plugin'),
    webpack = require('webpack');
path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        "plugins": ["@babel/plugin-proposal-class-properties"],

                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Pathfinding'
        }),
        new CopyPlugin([
            { from: 'src/assets', to: 'assets' }
        ]),
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js',
            TWEEN: ['@tweenjs/tween.js', 'default']
        })
    ]
};
