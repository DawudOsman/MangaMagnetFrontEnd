const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = 
{
    entry: {
      home:  './src/app.js',
      mangaHome: './src/Pages/mangaHome.js'
    },
    output: 
    {
        publicPath:"/",
        path: path.join(__dirname,'/dist'),
        filename: '[name]/bundle.js'
    },
    devServer:
    {
    hot: true,
    historyApiFallback: {
      index: "/home/index.html"
    },
    static: {
      publicPath: "/home/index.html",
      directory: path.join(__dirname, "/public")

    },
    },
    plugins:[
        new HTMLWebpackPlugin({
            filename:'home/index.html',
            template: './src/index.html',
            chunks: ['home']
        }),
        new HTMLWebpackPlugin(
            {
                filename: 'index2.html',
                template: './src/home.html',
                chunks: ['mangaHome']
            }
        )
    ],
    
    module: 
    {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: 
                {
                    loader: 'babel-loader',
                    options: 
                    {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // Convert images to inline base64
                type: 'asset/resource',
                exclude: /node_modules/,
                generator: {
                    filename: 'static/[hash][ext][query]'
                  }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1,
                      modules: {
                        localIdentName: "[name]__[local]___[hash:base64:5]",
                      },
                    }
                  }
                ],
                include: /\.module\.css$/
              },
              {
                test: /\.(css|scss)$/,
                use: [
                  'style-loader',
                  'css-loader'
                ],
                exclude: /\.module\.css$/
              },
            
        ]
    }
}