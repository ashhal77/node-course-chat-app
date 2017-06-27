const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=>{

console.log('new user connected');

socket.emit('newMessage', {
	from: 'admin', 
	text: 'welcome to the chat app',
	createdAt: new Date().getTime()
});

socket.broadcast.emit('newMessage', {
	from: 'admin', 
	text: 'new user joined', 
	createdAt: new Date().getTime()
});


socket.on('createMessage', function(message) {
console.log('createMessage', message);
io.emit('newMessage', {
from: message.from, 
text: message.text, 
createdAt: new Date().getTime()

});
/*socket.broadcast.emit('newMessage', {

	from: message.from, 
	text: message.text, 
	createdAt: new Date().getTime
});*/
    });


socket.on('disconnect', ()=>{

console.log('user was disconnected');

});
});

const port = process.env.PORT || 3000;


//comment
server.listen(port, ()=>{
	console.log(`the server is up pn port ${port}`);
});