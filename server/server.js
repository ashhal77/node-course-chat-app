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

socket.emit('newEmail', {
	from: 'mike@example.com',
	text: 'hey what is going in', 
    createAt: 123
});

socket.emit('newMessage', {
from: 'user@example.com', 
text: ' hi i am  a new user', 
createAt: 123
});

socket.on('createMessage', function(message) {
console.log('received the message from new user', message);
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