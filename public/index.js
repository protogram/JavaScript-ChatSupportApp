function sayUser(message) {
  // 右側にチャットボックスを作成
  const chatbox =
    '<li><div class="balloon balloon-r">' +
    '<p class="say say-r">' +
    message +
    '</p>' +
    '</div></li>';
  $('#chat-area').append(chatbox);
  // メッセージ最下部までスクロール
  $(window).scrollTop($('#chat-area')[0].scrollHeight);
}

function sayOperator(message) {
  // 左側にチャットボックスを作成
  const chatbox =
    '<li><div class="balloon">' +
    '<img class="img-circle" src="operator.png" alt="image" />' +
    '<p class="say">' +
    message +
    '</p>' +
    '</div></li>';
  $('#chat-area').append(chatbox);
  // メッセージ最下部までスクロール
  $(window).scrollTop($('#chat-area')[0].scrollHeight);
}

function sendMessage() {
  // メッセージを取得
  req_message = $('#msg-send').val();

  // ユーザが話す
  sayUser(req_message);

  // APIにアクセスする
  const body = new FormData();
  body.append('message', req_message);
  fetch('./chat', {
    method: 'POST',
    body,
  })
    .then((res) => res.json())
    .then((v) => {
      // オペレーターが話す
      sayOperator(v.answer);
    });

    
  // メッセージをクリア
  $('#msg-send').val('');
}


$(function () {
  $(window).keydown(function (e) {
    // 「Shift」+「Enter」を押したか
    if (e.keyCode === 13 && e.shiftKey) {
      sendMessage();
    }
  });
});
