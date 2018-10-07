// trabalhar com o socket.io

var socket = io.connect('http://192.168.0.100:6677', {'forceNew': true});

socket.on('messages', function(data){
  console.log(data);
  render(data);
});

function render(data){
  console.log(data);
  var html = data.map(function(message, index){
    return (`
      <div class="content">
        <p>${message.text}</p>
        <span class="time-right">${message.nickname}</span>
      </div>
      `);
  }).join(' ');

  var div_msgs = document.getElementById('messages');

  div_msgs.innerHTML = html;
  div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
  var message = {
    nickname: document.getElementById('nickname').value,
    text: document.getElementById('text').value,
  }

  document.getElementById('nickname').style.display = 'none';

  socket.emit('add-message', message);
  return false;

}
