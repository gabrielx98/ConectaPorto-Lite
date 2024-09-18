const HtmlWebPackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')
module.exports = {
    
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions:[".js",".jsx"]
                },
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html&/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(css|sass)$/,
                use:[
                    
                        'style-loader', 'css-loader'
                    
                ]
            }
        ]
    },
    resolve: {
        
        /* fallback: {
          "fs": false,
          "tls": false,
          "os":false,
          "constants":false,
          "net": false,
          "path": false,
          "zlib": false,
          "stream": require.resolve("stream-browserify"),
          "crypto": false,
          "dns":false,
          "buffer":require.resolve("buffer/"),
          "dgram":false,
          "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
        }  */
      },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        /* new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }), */
        
    ]
}