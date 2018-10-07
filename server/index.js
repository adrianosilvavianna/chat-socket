// importar bibliotecas
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

// crair Rotas
app.get('/hola-mundo', function(req, res){
  res.status(200).send('Olá mundo uma rota')
})


var messages = [{
  id: 1,
  text: 'um texto teste para uma aplicação',
  nickname: 'Bot - Adiano'

}
];


// conecção socket server
io.on('connection', function(socket){
  console.log('Cliente com IP: '+socket.handshake.address+' esta conectado ...')

  // emissao de evento
  socket.emit('messages', messages);
  // criar evento
  socket.on('add-message', function(data){

    messages.push(data);

    io.sockets.emit('messages', messages);

  });


})

// server start - command = npm start
server.listen(6677, function(){
  console.log('server funcionando - localhost:6677');
});
