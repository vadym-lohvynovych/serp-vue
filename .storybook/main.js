const VueLoaderPlugin = require('vue-loader/lib/plugin');

const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  webpackFinal: storybookBaseConfig => {
    storybookBaseConfig.plugins.push(new VueLoaderPlugin());
    storybookBaseConfig.module.rules.push(
      {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        include: path.resolve(__dirname, '../')
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: path.resolve(__dirname, '../')
      }
    );
    return storybookBaseConfig;
  }
};
