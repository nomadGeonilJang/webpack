
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const config = {
    mode:'production',
    plugins:[
        new OptimizeCssAssetsPlugin({ //css 압축 그대로 복사해서 사용
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    ],
    //runtime vender 분리한다.
    optimization:{
        runtimeChunk:{
            name:'runtime'
        },
        splitChunks:{
            cacheGroups:{
                commons:{
                    test:/[\\/]node_modules[\\/]/,
                    name:'venders',
                    chunks:'all'
                }
            }
        },
        minimize:true,
        minimizer:[new TerserWebpackPlugin({
            parallel:true
        })]
    }
}

module.exports = merge(common, config)