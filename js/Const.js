var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

var foodLife = 0;
var foodTime = 1;
var foodHome = 2;
var foodBomb = 3;
var foodStar = 4;
var foodGod = 5;
var foodNon = 6;

var offerX = 32;
var offerY = 16;

var NON = 0;
var WALL = 1;
var GRID = 2;
var GRASS = 3;
var WATER = 4;
var ICE = 5;
var HOME = 9;
var DIE = 10;


var STATE_INIT = 1;
var STATE_PLAY = 2;
var STATE_STAGE_INIT = 3;
var STATE_GAMEOVER = 4;
var STATE_SELECT = 5;
var STATE_GAMESTART = 6;

var STATE_PAUSE = 7;  // VICTOR FANG


var K_UP = 38;
var K_DOWN = 40;
var K_RIGHT = 39;
var K_LEFT = 37;

var K_SPACE = 32;
var K_TAB = 9;
var K_ENTER = 13;
//var K_ENTER = 16;
var K_CTRL = 17;
var K_ALT = 18;

var K_0 = 48;
var K_1 = 49;
var K_2 = 50;
var K_3 = 51;
var K_4 = 52;
var K_5 = 53;
var K_6 = 54;
var K_7 = 55;
var K_8 = 56;
var K_9 = 57;
var K_A = 65;
var K_B = 66;
var K_C = 67;
var K_D = 68;
var K_E = 69;
var K_F = 70;
var K_G = 71;
var K_H = 72;
var K_I = 73;
var K_J = 74;
var K_K = 75;
var K_L = 76;
var K_M = 77;
var K_N = 78;
var K_O = 79;
var K_P = 80;
var K_Q = 81;
var K_R = 82;
var K_S = 83;
var K_T = 84;
var K_U = 85;
var K_V = 86;
var K_W = 87;
var K_X = 88;
var K_Y = 89;
var K_Z = 90;

var images = new Array();

images["home"] = [256,0];
images["map"] = [0,96];
images["tankNum"] = [0,112];
images["myTank"] = [0,0];
images["myTank2"] = [128,0];
images["tank1"] = [0,32];
images["tank2"] = [128,32];
images["tank3"] = [0,64];
images["tankRun"] = [128,96];
images["hitFx"] = [320,0];
images["bombFx"] = [0,160];
images["bullet"] = [80,96];
images["tankStart"] = [256,32];
images["food"] = [256,110];
images["score"] = [192,96];
images["num"] = [256,96];
images["shield"] = [160,96];
images["stageStart"] = [396,96];
images["gameOver"] = [384,64];

var imgStartData = "data:image/gif;base64,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";
var imgStart = new Image();
imgStart.src = imgStartData;


function GameStart()
{
	this.x = 0;
	this.y = 512;
}


GameStart.prototype.draw = function()
{
	var myCanvas = document.getElementById("upp");
	var graphics = myCanvas.getContext("2d");
	if(this.y == 512)
	{
		graphics.fillStyle = "#000";
		graphics.fillRect(0, 0, 512, 448);
	}
	graphics.drawImage(imgStart, this.x, this.y, 512, 448);

	if(this.y <= 0)
	{
		this.y = 0;
		graphics.drawImage(imgStart, this.x, this.y, 512, 448);

		graphics.fillStyle = "#FFF";
		graphics.font = "bold 20px Arial";
		graphics.fillText("AI By Jules Wang", 10, 425);
		gameState = STATE_SELECT;
		this.init();

	}

	this.y -= 5;
}

GameStart.prototype.init = function()
{
	this.y = 512;
}



function TankRun()
{
	this.x = 128;
	this.time = 0;

	this.num = 0;
	this.ys = [248, 280, 312];
}

TankRun.prototype.draw = function()
{
	var myCanvas = document.getElementById("stage");
	var graphics = myCanvas.getContext("2d");
	var img = document.getElementById("tankAll");

	this.time ++;
	var temp;

	if( parseInt(this.time / 6) % 2 == 0)
	{
		temp = 0;
	}
	else
	{
		temp = 27;
	}
	graphics.drawImage(img, images["tankRun"][0],images["tankRun"][1] + temp, 27,27, this.x, this.ys[this.num], 27, 27 )
}

TankRun.prototype.init = function()
{

	var myCanvas = document.getElementById("stage");
	var graphics = myCanvas.getContext("2d");
	graphics.clearRect(this.x, this.ys[this.num], 27, 27);

	this.time = 0;
	this.num = 0;
}

TankRun.prototype.next = function(n)
{
	var myCanvas = document.getElementById("stage");
	var graphics = myCanvas.getContext("2d");

	graphics.clearRect(this.x, this.ys[this.num], 27, 27);

	if(n == 1)
	{
		if(this.num == 2)
		{
			this.num = 0;
			return;
		}
		this.num ++;
	}
	else
	{
		if(this.num == 0)
		{
			this.num = 2;
			return;
		}
		this.num --;
	}
}



function GameOver()
{
	this.x = 210;
	this.y = 512;
}


GameOver.prototype.draw = function()
{
	var myCanvas = document.getElementById("stage");
	var graphics = myCanvas.getContext("2d");
	var img = document.getElementById("tankAll");

	graphics.clearRect(this.x, this.y + 2, 62, 30);
	graphics.drawImage(img, images["gameOver"][0],images["gameOver"][1], 62, 30, this.x, this.y, 62, 30);

	if(this.y <= 100)
	{
		gameState = STATE_GAMESTART;
		graphics.clearRect(this.x, this.y, 62, 30);
		this.init();
	}

	this.y -= 2;
}

GameOver.prototype.init = function()
{
	this.y = 512;
}
