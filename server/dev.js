const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const devConfig = require('../webpack.config.dev');

const compiler = webpack(devConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: devConfig.output.publicPath,
  stats: { colors: true },
});
const hotMiddleware = webpackHotMiddleware(compiler, {
  log: console.log, // eslint-disable-line
});
const devFilePath = path.join(compiler.outputPath, 'index.pug');
const fileRouter = (req, res, next) => {
  compiler.outputFileSystem.readFile(devFilePath, (err, result) => {
    if (err) {
      next(err);
    }
    fs.writeFile('./develop/index.pug', result, (errW) => {
      if (errW) {
        next(errW);
      }
      next();
    });
  });
};

module.exports = {
  devMiddleware,
  hotMiddleware,
  fileRouter,
};
