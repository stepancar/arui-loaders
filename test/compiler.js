import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';
const merge = require('webpack-merge');
const ARUI_TEMPLATE = require('arui-presets/webpack.base');
const ARUI_DEV_TEMPLATE = require('arui-presets/webpack.development');

export default (fixture, options = {}) => {
    const webpackConfig = merge.smart(
      ARUI_TEMPLATE,
      ARUI_DEV_TEMPLATE,
      {
        resolve: {
            modules: [
                path.join(process.cwd(), 'node_modules')
            ],
            extensions: ['.js', '.jsx']
        },
        context: __dirname,
        entry: {
            index: [`./${fixture}`],
        },
        output: {
            path: path.resolve(__dirname),
            filename: './bundle.js',
        },
        module: {
            rules: [
                {
                  test: /\index.jsx?$/,
                  exclude: /node_modules/,
                  use: [{
                      loader: path.resolve(__dirname, '../src/cn-decorator-loader.js'),
                      options
                  }]
                },
                {
                  test: /\index.css?$/,
                  exclude: /node_modules/,
                  use: [{
                      loader: path.resolve(__dirname, '../src/cn-decorator-postcss-loader.js'),
                      options
                  }]
                }
            ]
        }
      }
  );
  const compiler = webpack(webpackConfig);

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) { 
        reject(err);
        console.error(err);
      }
      resolve(stats);
    });
  });
}