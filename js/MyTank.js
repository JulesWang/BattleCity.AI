function MyTank(x, y)
{
	Tank.call(this, x, y, "myTank", 2 , 0);
	this.isGod = true;
	this.godTime = 600;
	this.dir = UP;
	this.score = 0;
	this.name = 0;
	
	this.live = 5;
	this.score = 0;
}

MyTank.prototype = new Tank();

MyTank.prototype.draw = function(canvas)
{
	var myCanvas = document.getElementById(canvas);
	var graphics = myCanvas.getContext("2d");
	var img = document.getElementById("tankAll");
	
	var tankx,tanky,shieldx,shieldy;
	
	shieldx = images["shield"][0];
	shieldy = images["shield"][1];
	
	if(this.name == 1) 
	{
		tankx = images["myTank"][0];
		tanky = images["myTank"][1]; 
	}
	
	else
	{
		tankx = images["myTank2"][0];
		tanky = images["myTank2"][1]; 
	}
	
	graphics.drawImage(img, 32 * this.dir + tankx, tanky, 32, 32, this.x + offerX, this.y + offerY, 32, 32) ;	
		
	
	if(this.isGod)
	{
		var fr = parseInt(this.godTime / 6 )% 2;
		graphics.drawImage(img, shieldx, fr * 32 + shieldy, 32, 32, this.x + offerX, this.y + offerY, 32, 32) ;
	}
		
	return;
};

MyTank.prototype.shot = function()
{
	if(!this.isShot)
	{	
		this.isShot = true;
		var bullet = new Bullet(this.x,this.y,this.type,this.dir,this.name);
		bullets.push(bullet);
		sound.play("attack");
	}
};

MyTank.prototype.updata = function()
{
	if(this.isShot) 
	{
		this.time++;
		if(this.time > this.shotSpeed)
		{
			this.time = 0;
			this.isShot = false;
		}
	}
	
	if(this.isGod) 
	{
		this.godTime --;		
		if(this.godTime == 0)	{this.isGod = false;}
	}
};

function Tank1(x, y)
{
	Tank.call(this, x, y, "tank1", 2, 1);
	this.score = 100;
}

Tank1.prototype = new Tank();



function Tank2(x, y)
{
	Tank.call(this, x, y, "tank2", 3, 1);
	this.score = 200;
}

Tank2.prototype = new Tank();


function Tank3(x, y)
{
	Tank.call(this, x, y, "tank3", 1, 1);
	this.life = 3;
	this.score = 400;
	return;
}

Tank3.prototype = new Tank();

Tank3.prototype.draw = function(canvas)
{
	var myCanvas = document.getElementById(canvas);
	var graphics = myCanvas.getContext("2d");
	var img = document.getElementById("tankAll");
	
	graphics.drawImage(img, 32 * this.dir +(3 - this.life) * 128 + images["tank3"][0], images["tank3"][1], 32, 32, this.x + offerX, this.y + offerY, 32, 32) ;	
};
