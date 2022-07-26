// モジュール準備
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(multer().none());

// 静的コンテンツ（HTMLファイル）の返却準備
app.use(express.static('public'));

// チャット用エンドポイント
app.post('/chat', function (req, res) {
  const message = req.body.message;
  console.log('受信メッセージ:' + message);

  let answer = '（回答できずに困っている）';

  // 回答をテキストファイルから読み込み
  const text = fs.readFileSync('response.txt', 'utf8');
  const lines = text.toString().split('\n');
  for (let idx in lines) {
    const value = lines[idx].split(',');
    // あいまい検索（文字列中に送信されてきたメッセージが含まれているか）
    if (value[1] !== undefined && message.indexOf(value[0]) != -1) {
      answer = value[1];
      break;
    }
  }

  console.log('返却メッセージ:' + answer);
  res.send({
    answer: answer
  });
});

// サーバーを起動する
const port = 3000;
app.listen(port, function () {
  console.log('Node.js Server Started: http://localhost:' + port);
});
