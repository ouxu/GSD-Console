const getRelPath = path => __dirname + path;

export default {
  treeShaking: true,
  ignoreMomentLocale: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: {
          webpackChunkName: false,
          loadingComponent: 'components/Loading',
          level: 1,
        },
        dll: true,
        locale: {
          enable: true,
          default: 'zh-CN',
          baseNavigator: false,
        },
        routes: {
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
            /config\.(j|t)sx?$/,
          ],
        },
      },
    ],
  ],
  alias: {
    components: getRelPath('/src/components'),
    contexts: getRelPath('/src/contexts'),
    configs: getRelPath('/src/configs'),
    images: getRelPath('/src/images'),
    pages: getRelPath('/src/pages'),
    utils: getRelPath('/src/utils'),
    services: getRelPath('/src/services'),
    layouts: getRelPath('/src/layouts'),
  },
};
