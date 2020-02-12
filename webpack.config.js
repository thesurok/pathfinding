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
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Fight Club'
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
