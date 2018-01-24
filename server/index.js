require('@babel/register')({
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
        useBuiltIns: 'usage',
      },
    ],
    '@babel/stage-2',
  ], // 防止被pwd路径下最近的 .babelrc 覆盖
});
module.exports = require('./expressApp');
