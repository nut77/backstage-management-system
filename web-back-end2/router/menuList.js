const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('参数列表相关操作: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send('返回参赛作品列表');
});

router.post('/', (req, res) => {
  res.send('新增参赛作品');
});

router.delete('/', (req, res) => {
  res.send('删除参赛作品');
});

module.exports = router;
