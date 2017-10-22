console.log('My socket Server is Running');

var express = require('express');

var app  = express();

var server = app.listen(3000);

// host the folder named 'public'
app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

// server awaits for a new connection
io.sockets.on('connection', newConnection );

// does stuffs when server opens a new connection
function newConnection(socket){
	// console.log(socket);
	// the id of the new connection
	console.log('new connection: '+ socket.id);

// server is on for msg named 'mouse' from client
	socket.on('mouse', mouseMsg);

// server is on for msg 'image'
	socket.on('image', userImg);

// server sends the image to client
	function userImg(file){
		socket.broadcast.emit('image', file);
	}

// server is on for msg named 'message' from client
	socket.on('message', textMsg);

// server send the msg 'message' it received from one client to another
	function textMsg(text){
		socket.broadcast.emit('message', text);
	}


// server send the msg 'mouse' it received from one client to another
	function mouseMsg(data){
		// console.log(data);
		socket.broadcast.emit('mouse', data);
	}
}

 