const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:9090',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, '../src/index.js')
    ], //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
    output: {
        path: path.resolve(__dirname, '../dist'), // 输出的路径
        filename: 'bundle.js'  // 打包后文件
    },
    module: {
        rules: [
            {//ES6、JSX处理
                test:/(\.jsx|\.js)$/,
                exclude: /node_modules/,
                loader:'babel-loader',
                query:
                    {
                        presets:["env", "react"],
                        plugins: [
                            [
                                "import",
                                {libraryName: "antd", style: 'css'}
                            ]
                        ]
                    },
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader",
                        {
                            loader: "less-loader",
                            options: {
                              javascriptEnabled: true
                            }
                        }
                    ]
                })
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
　　 　　new HtmlWebpackPlugin({
　　　　 　　template: path.resolve(__dirname, '../src/index.template.html'),
　　　　　　 inject: true
　　　　 }),
        new ExtractTextPlugin("styles.css"),
        new webpack.HotModuleReplacementPlugin()
　　 ],
    mode: "development"
}