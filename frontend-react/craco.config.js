const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: 
            { 
              '@primary-color': '#7393B3',
              '@btn-font-weight': '700',
              '@btn-primary-color': '#000000',
              '@text-selection-bg': '#000000',
              '@menu-highlight-color': '#000000',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};