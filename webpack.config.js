module.exports = {
    entry: "./frontend/index.js",
    output: {
        path: __dirname,
        filename: "./public/index.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    }
};