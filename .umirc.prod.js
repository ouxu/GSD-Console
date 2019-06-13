// const QiniuPlugin = require('qiniu-webpack-plugin')

export default {
  targets: { ie: 10 },
  publicPath: '/umi/',
  chainWebpack: (config, { webpack }) => {
    config.optimization.delete('splitChunks')
    // config.plugin('qiniu').use(QiniuPlugin, [require('./pushConfig').qiniu])
  }
}
