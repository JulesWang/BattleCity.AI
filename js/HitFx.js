function HitFx(x,y)
{
	Sprite.call(this, x, y, "hitFx", 6);
	
	this.x = x - 16;
	this.y = y - 16;
	
	this.type = 0;
	this.frame = 0;
	this.time = -3;
}

HitFx.prototype.draw = function(canvas)
{
	
	
	var myCanvas = document.getElementById(canvas);
	var graphics = myCanvas.getContext("2d");
	var img = document.getElementById("tankAll");
	
	
	
	if(this.type == 0)
	{
		graphics.drawImage(img,this.frame * 32 + images[this.src][0], images[this.src][1], 32, 32, this.x + offerX, this.y + offerY, 32, 32) ;
	}
	else
	{
		graphics.drawImage(img,this.frame * 32 + images[this.src][0], images[this.src][1], 32, 32, this.x + offerX + 6, this.y + offerY + 6, 20, 20) ;
	}
	
	
	
	return;
};

HitFx.prototype.updata = function()
{
	if(this.time % 4 == 1) {this.frame++;}
	
	if(this.frame > 3) {return;}
	
	this.time ++;
};

function drawHitFxs()
{
	
	for(var i = 0;i < hitFxs.length;i++)
	{
		hitFxs[i].draw("main");
	}
}

function updataHitFxs()
{
	
	for(var i = 0;i < hitFxs.length;i++)
	{
		hitFxs[i].updata();
		
		if(hitFxs[i].frame > 2)
		{
			
			hitFxs.splice(i,1);
			i --;
		}
	}
}