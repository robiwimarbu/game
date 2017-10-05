port =5000;
serverNode="http://127.0.0.1";
mySpeed = 10;
MOVE_UP = 39;
MOVE_DOWN = 37;
MOVE_RIGHT= 40;
MOVE_LEFT = 38;
KEY_SHOOT = 32;
WIDTH_STAGE = 500;
HEIGHT_STAGE = 350;
X_STAGE = 0;
Y_STAGE = 50;
function Game(){
	this.background="";
	this.players=[];
	this.prize = [];
	this.stage=null;
	this.x = X_STAGE;
	this.y = Y_STAGE;
	this.width = WIDTH_STAGE;
	this.height = HEIGHT_STAGE;
}

Game.prototype.newPlayer = function(Player){
	
	if(!Player)
		return;
	
	if ( typeof Player.idPlayer == "undefined" ){
		return;
	}
	var idPlayer = Player.idPlayer;
	this.players[idPlayer] = Player;
	
	objPlayer = document.createElement("div");
	objPlayer.style.position = "absolute";
	objPlayer.style.top = Player.x +"px";
	objPlayer.style.left = Player.y +"px";
	objPlayer.style.width = Player.width +"px";
	objPlayer.style.height = Player.height +"px";
	objPlayer.id = Player.idPlayer;
	
	this.stage.appendChild(objPlayer);
	imgAccion = document.createElement('img');
	imgAccion.id="img_"+Player.idPlayer;
	imgAccion.style.width=Player.width;
	imgAccion.style.height=Player.height;
	objPlayer.appendChild(imgAccion);
	
}

Game.prototype.deletePlayer = function(Player){
	
	if ( typeof Player.idPlayer == "undefined" ){
		return;
	}
	var idPlayer = Player.idPlayer;
	//var copyPlayers = this.players;
	delete this.players[idPlayer];
	//this.players = copyPlayers;
	var objPlayer = document.getElementById(Player.idPlayer);
	if( objPlayer ){
		objPlayer.parentNode.removeChild(objPlayer);
	}
	
}



Game.prototype.setStage = function(_stage){
	this.stage = _stage;
}


Game.prototype.show = function(idContainer){
	try{
		console.log(this.x);
		bound = document.createElement("div");
		bound.id="thestage";
		bound.style.position="absolute";
		bound.style.left = this.x +"px";
		bound.style.top = this.y +"px";
		bound.style.width = this.width +"px";
		bound.style.height = this.height +"px";
		bound.style.border = "1px solid #000";
		bound.style.overflow = "hidden";
		container = document.getElementById(idContainer);
		container.appendChild(bound);
		
		this.stage = bound;
		
	}catch(Exeption){
		console.log(Exeption);
	}
}

var game = new Game();

function Player(idPlayer){
	this.idPlayer = idPlayer;
	this.accion = [];
	this.currentAccion=null;
	this.x=0;
	this.y=0;
	this.width=50;
	this.height=70;
	this.weapon = null;
}

Player.prototype.move =function(idPlayer,_x,_y){
	//getPlayer to move on the struct.
	var currentPlayer  = this.getPlayer(idPlayer);
	currentPlayer.x = _x;
	currentPlayer.y = _y;
	objPlayer = document.getElementById(idPlayer);
	objPlayer.style.top = currentPlayer.x +"px";
	objPlayer.style.left = currentPlayer.y + "px";
	
}

Player.prototype.addAccion = function(accion,gift){
	this.accion[accion]=gift;
}

Player.prototype.getPlayer =function(idPlayer){
	return game.players[idPlayer];
}


Player.prototype.setAccion = function(idPlayer,accion){
	var currentPlayer  = this.getPlayer(idPlayer);
	
	var imgAccion = document.getElementById("img_"+idPlayer);
	imgAccion.src = currentPlayer.accion[accion];
	currentPlayer.currentAccion = currentPlayer.accion[accion];
}

Player.prototype.getAccion = function(){
	return this.currentAccion
}


function _keyPress(Sender,e){
	var key = e.which ? e.which : e.keyCode;

	/* if(key == someKey){
	ev.returnValue = false;
	if(e.preventDefault) e.preventDefault();
	return false;
	} */
	return key;
}

function Weapon(){
	/*points start position for ball */
	this.x = 10;
	this.y =50;
	this.balls=[];
}


function Ball(){
	
}
