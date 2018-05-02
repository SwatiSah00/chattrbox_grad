var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var currentTopic = '';
console.log('websockets server started');
ws.on('connection', function(socket) {
  console.log('client connection established');
  if(currentTopic == ''){
    messages.forEach(function(msg) {
      socket.send(msg);
    });

  } else {
    socket.send('*** Topic is "' + currentTopic + '"');
    messages.forEach(function(msg) {
      socket.send(msg);
    });
  }
  socket.on('message', function(data) {
    console.log('message received: ' + data);
    var substring = '/topic';
    if(data.indexOf(substring) == 0){
      currentTopic = data.slice(6);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send('*** Topic has changed to "' + currentTopic + '"');
      });
    } else {
      messages.push(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data);
      });

    }

  });
});
/*ws.on('connection', function(socket) {
  console.log('client connection established');
  messages.forEach(function(msg) {
    socket.send(msg);
  });
  socket.on('message', function(data) {
    console.log('message received: ' + data);
    messages.push(data);
    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data)
    });
  });
});*/

/*ws.on('connection', function(socket) {
  console.log('client connection established');
  messages.forEach(function(msg) {
    socket.send(msg);
  });
  socket.on('message', function(data) {
    console.log('message received: ' + data);
    if (data == '/topic Chatting about WebSockets') {
      //messages.push('*** Topic has changed to Chatting about WebSockets');
      clientSocket.send('*** Topic has changed to Chatting about WebSockets')

    } else {
      messages.push(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data)
      });
    }
  });
});*/
