import Home from '../src/components/home';

const path = require('path');
const React = require('react');
const express = require('express');
const ReactDOMServer = require('react-dom/server');
const webpackMiddleware = require('./dev');

const isProd = process.env.NODE_ENV === 'production';
const app = express();
const webRouter = express.Router();
if (!isProd) {
  webRouter.get('*', webpackMiddleware.fileRouter); // 获取并在磁盘生成views文件供模板引擎渲染
}
webRouter.get('/', (req, res) => {
  const ReactSSR = ReactDOMServer.renderToString(React.createElement(Home));
  res.render('index', {
    ReactSSR,
    preloadedState: {
      title: 'reduxSSR',
      content: 'reduxSSR',
    },
  });
});
if (isProd) {
  app.set('views', path.join(__dirname, '../dist'));
} else {
  app.set('views', path.join(__dirname, '../develop'));
  app.use(webpackMiddleware.devMiddleware);
  app.use(webpackMiddleware.hotMiddleware);
}
app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(webRouter);

app.use((err, req, res) => {
  console.error(err.stack); // eslint-disable-line
  res.status(500).send('Something broke!');
});
app.listen(3000);
console.log('This example is based on ReactSSR'); // eslint-disable-line
