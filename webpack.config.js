const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyESPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development';

// 负责将html文档虚拟到根目录下
let htmlWebpackPlugin = new HtmlWebpackPlugin({
    // 虚拟的html文件名 index.html
    filename: 'index.html',
    // 虚拟html的模板为 src下的index.html
    template: path.resolve(__dirname, './src/index.html'),

    react: isDev ? "https://unpkg.com/react@16/umd/react.development.js" : "https://unpkg.com/react@16/umd/react.production.min.js",
    react_dom: isDev ? "https://unpkg.com/react-dom@16/umd/react-dom.development.js" : "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
    minify: {
        collapseWhitespace: !isDev,
        removeComments: !isDev,
        removeRedundantAttributes: !isDev,
        removeScriptTypeAttributes: !isDev,
        removeStyleLinkTypeAttributes: !isDev,
        useShortDoctype: !isDev
    }
})

module.exports = {
    mode: isDev ? "development" : "production",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/main.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: isDev ? 'cheap-module-eval-source-map' : "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                },
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    // 配置开发服务器, 并配置自动刷新
    devServer: {
        // 根目录下dist为基本目录
        contentBase: path.join(__dirname, 'dist'),
        // 自动压缩代码
        compress: true,
        // 服务端口为1208
        port: 3000,
        // 自动打开浏览器
        open: true
    },
    // 装载虚拟目录插件
    plugins: [
        htmlWebpackPlugin,
        new CleanWebpackPlugin(),
        new UglifyESPlugin({
            // 多嵌套了一层
            uglifyOptions: {
                compress: {
                    // 在UglifyJs删除没有用到的代码时不输出警告
                    warnings: false,
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                },
                output: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false,
                }
            }
        })

    ],
};