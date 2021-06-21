const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const server = require("http").createServer(app);
const io= require("socket.io")(server,{cors : {origin :"*"}});
// sendFile will go here
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
server.listen(port);
console.log('Server started at http://localhost:' + port);

io.on('connection', (socket)=>{
    console.log("User connected:"+socket.id);
         //EVENTO ENVIAR MESSAGE
         socket.on('message',(data)=>{
             //broadcast envia el mensaje a todos menos nosotros mismos
            socket.broadcast.emit('message',data);
          });
})