const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=>{

console.log('new user connected');

socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'));

socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));


socket.on('createMessage', function(message, callback) {
console.log('createMessage', message);
io.emit('newMessage', generateMessage(message.from, message.text));
callback();

    });

socket.on('createLocationMessage', (coords)=>{
	io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));

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