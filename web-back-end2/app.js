const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
var menuList = require(path.join(__dirname, 'router/menuList'));

app.listen(port, () => {
  console.log(`listening post: ${port}`);
});

app.get('/', (req, res, next) => {
  res.send('hello word');
  console.log('/-' + new Date().getTime());
  next();
});
app.use('/menuList', menuList);

function logger(req, res, next) {
  console.log('中间件logger-' + new Date().getTime());
  next();
}

// 每次应用收到请求时，都会执行该功能。 要看先后顺序
app.use(logger);

app.use((req, res, next) => {
  res.status(404).send('404');
  console.log('404-' + new Date().getTime());
  next();
});

// 错误处理
app.use((err, req, res, next) => {
  res.status(500).send('500');
  console.log('500-' + new Date().getTime());
});
