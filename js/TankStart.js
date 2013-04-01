function TankStart(x, y)
{
	Sprite.call(this, x, y, "tankStart", 32);
	
	this.frame = 0;
	this.time =  0;
	this.num = 0;
}

TankStart.prototype = new Sprite();

TankStart.prototype.draw = function(canvas)
{
	var myCanvas = document.getElementById(canvas);
	var graphics = myCanvas.getContext("2d");
	var img = document.getElementById("tankAll");
	
	graphics.drawImage(img, 32 * this.frame + images[this.src][0], images[this.src][1], 32, 32, this.x + offerX,this.y + offerY,32,32) ;	
	
	return;
};

TankStart.prototype.updata = function()
{
	if(this.time%5 == 1) {this.frame++;}

	if(this.frame > 5)  
	{
		this.frame = 0;
		this.num ++;
	}

	this.time ++;
};


function updataTankStarts()
{
	for(var i = 0;i < tankStarts.length;i++)
	{
		tankStarts[i].updata();
		
		if(tankStarts[i].num >= 4 )
		{
			addTank(tankStarts[i].x, tankStarts[i].y, parseInt(Math.random() * 3) + 1);
			tankStarts.splice(i,1);
			i --;
		}	
	}
}


function drawTankStarts()
{
	for(var i = 0;i < tankStarts.length;i++)
	{
		tankStarts[i].draw("main");
	}
}















