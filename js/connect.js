var express = require('express');
var cors = require('cors')
var app = express();

var path = require('path');

const corsOptions = {
  origin: 'http://localhost:* http://127.0.0.1:*'
};

//app.use(cors(corsOptions));
app.use(cors());

var server = require('http').createServer(app);
var socket = require('socket.io');
var port = process.env.PORT || 5000;
var io = require('socket.io')(server);

players={};
p={};

io.sockets.on('connection', function (socket) {
	
	
	//legada de un player
	socket.on("newPlayer",function(data){
		try{
			console.log("player", JSON.stringify(data));
			//add allPlayer
			players[socket.id] = data;
			p[data.idPlayer] = data;
			io.sockets.emit("newPlayer",data);
		}catch(err){
			console.log(err);
		}
	});
	
	socket.on("newConnectPlayer",function(data){
		try{
			console.log("se conecto" );
			socket.emit("setPlayers",p);	
		}catch(err){
			console.log(err);
		}
	});
	
	//shootPlayer
	socket.on('shootPlayer',function(data){
		try{
			console.log("shoot", data );
			players[socket.id] = data;
			p[data.idPlayer] = data;
			io.sockets.emit("shootPlayer",data);
		}catch(err){
			console.log(err);
		}
		
	});
	
	//movPlayer
	socket.on('movePlayer',function(data){
		try{
			console.log("move", data );
			players[socket.id] = data;
			p[data.idPlayer] = data;
			io.sockets.emit("movePlayer",data);
		}catch(err){
			console.log(err);
		}
	});
	
	//Diconnect player
	socket.on('disconnect',function(data){
		try{
			if ( typeof players[socket.id] != "undefined" ) {
				console.log("bye player "+ players[socket.id].idPlayer);
				var id = players[socket.id].idPlayer;
				io.sockets.emit("deletePlayer",players[socket.id]);
				delete players[socket.id];
				delete p[id];
			}
		}catch(err){
			console.log(err);
		}
	});
	
	
});
io.listen(port);