const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtrackPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
module.exports = {
    entry:"/src/index.js",
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'[name].[chunkhash].js'   //hash, contenthash(자원에 따라서 별도로), [name].[chunkhash].js쌍으로 
    },
    mode:'none',
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[
                    // 'style-loader', /* 내부에 style tag 생성 */
                    // {
                    //     loader:'style-loader',
                    //     options:{
                    //         injectType:'singletonStyleTag'
                    //     }
                    // },
                    {loader:MiniCssExtrackPlugin.loader}, /* css 파일로 만든다.*/
                    { 
                        loader:'css-loader',
                        options:{
                            modules:true
                        }
                    },
                    
                ]
            },
            {
                test:/\.hbs$/,
                use:['handlebars-loader']
            }
        ]
    },
    plugins:[
        new OptimizeCssAssetsPlugin({ //css 압축 그대로 복사해서 사용
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new MiniCssExtrackPlugin({
            filename:`[contenthash].css`
        }),
        new HTMLWebpackPlugin({
           template: './template.hbs', //여기 기준으로 새로운 index.html 파일을 생성해 줍니다.
           title:'Hello Webpack',
           meta:{
               viewport:'width=device-width, initial-scale=1.0'
           },
           //최적화 시키기 할 수 있습니다.
           minify:{
               collapseWhitespace:true,
               useShortDoctype:true,
               removeScriptTypeAttributes:true
           }

        }),
        new CleanWebpackPlugin() //빌드마다 새로 dist 싹 생성한다.
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