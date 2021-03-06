module.exports = {
    entry: "./src/presenter/index.js",
    output: {
        path: __dirname,
        filename: "./public-presenter/index.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.less$/, loader: "style!css!less" }
        ]
    }
};