function Tank(x, y, src, speed , type)
{
	Sprite.call(this, x, y, src, 30);
	
	this.dir = DOWN;
	this.preDir = DOWN;
	this.speed = speed;
	this.type = type;
	this.isShot = false;
	this.time = 0;
	this.shotSpeed = 70;
	this.life = 1;
}

Tank.prototype = new Sprite();

Tank.prototype.moveFree = function(amap)
{
	this.shot();
	this.think(amap);
	this.move(this.dir);

	return;
};

Tank.prototype.draw = function(canvas)
{
	var myCanvas = document.getElementById(canvas);
	var graphics = myCanvas.getContext("2d");
	var img = document.getElementById("tankAll");
	
	var xx = images[this.src][0];
	var yy = images[this.src][1];
	
	graphics.drawImage(img,32 * this.dir + xx, yy, 32, 32,this.x + offerX,this.y + offerY,32,32) ;	
	
	
	return;
};

Tank.prototype.updata = function()
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
};

Tank.prototype.move = function(dir)
{
	switch(dir)
	{
		case UP :
		{
			if(this.moveUp()) 
			{
				this.y -= this.speed;return true;
			} 
			
			break;
		}
		case DOWN:
		{
			if(this.moveDown()) 
			{
				this.y += this.speed;return true;
			} 
			break;
		}
		case LEFT:
		{
			if(this.moveLeft()) 
			{
				this.x -= this.speed;return true;
			} 
			break;
		}
		case RIGHT:
		{
			if(this.moveRight()) 
			{
				this.x += this.speed;return true;
			} 
			break;
		}
		
		default:break;
	}
	return false;
};

function clearTank(x,y)
{
	var myCanvas = document.getElementById("main");
	var graphics = myCanvas.getContext("2d");
	var imgTank = document.getElementById("Tank");
	
	
	graphics.clearRect(x + offerX,y + offerY,32,32);
}

Tank.prototype.setPosition = function()
{

	if ( (this.preDir < 2 && this.dir >1) || (this.preDir > 1 && this.dir <2)  ) 
	{
		var f;
		switch(this.dir)
		{
			case UP:
			case DOWN:
				f = parseInt((this.x + 8) / 16);
				f = f * 16;
				this.x = f;	
				break;
			
			case LEFT:
			case RIGHT:
				f = parseInt((this.y + 8) / 16);
				f = f * 16;
				this.y = f ;
				break;
		}
	}
	this.preDir = this.dir;
	
};

Tank.prototype.moveUp = function()
{
	this.dir = UP;
	this.setPosition();
	var col = parseInt((this.y - this.speed)/16);
	if(col < 0) 
	{
		col = 0;
	}
	var row1 = parseInt(this.x /16);
	var row2 = parseInt( (this.x + this.width) /16);
	var row3 = parseInt( (this.x +(this.width/2) )/16);
	
	if(this.y - this.speed > -1 && check(row1,col) && check(row2,col) && check(row3,col))
	{
		return !this.checkHit(tanks);
	}
	return false;
	
};

Tank.prototype.moveDown = function()
{
	this.dir = DOWN;
	this.setPosition();
	
	var col = parseInt((this.y + this.speed + this.width)/16);
	var row1 = parseInt(this.x /16);
	var row2 = parseInt( (this.x + this.width) /16);
	var row3 = parseInt( (this.x +(this.width/2) )/16);
	
	if(this.y + this.speed + this.width < 416 && check(row1,col) && check(row2,col) && check(row3,col))
	{
		return !this.checkHit(tanks);
	}
	return false;
	
};

Tank.prototype.moveLeft = function()
{
	this.dir = LEFT;
	this.setPosition();
	
	var row = parseInt((this.x - this.speed)/16);
	if(row < 0) 
	{
		row = 0;
	}
	var col1 = parseInt(this.y /16);
	var col2 = parseInt( (this.y + this.width) /16);
	var col3 = parseInt( (this.y +(this.width/2) )/16);
	
	
	if(this.x - this.speed > -1 && check(row,col1) && check(row,col2) && check(row,col3))
	{
		return !this.checkHit(tanks);
	}
	return false;
	
};

Tank.prototype.moveRight = function()
{
	
	this.dir = RIGHT;
	this.setPosition();
	
	var row = parseInt((this.x + this.speed + this.width)/16);
	
	var col1 = parseInt(this.y /16);
	var col2 = parseInt( (this.y + this.width) /16);
	var col3 = parseInt( (this.y +(this.width/2) )/16);
	
	if(this.x + this.speed + this.width < 416 && check(row,col1) && check(row,col2) && check(row,col3))
	{
		return !this.checkHit(tanks);
	}
	return false;
	
};



function check(x,y)
{
	if(y > 25) 
	{	
		y = 25;
	}
	else if(y < 0 ) 
	{
		y = 0;
	}
	
	if(x < 0 )  
	{
		x = 0;
	}
	else if(x > 25)  
	{
		x = 25;
	}
	
	if( map[y][x] == NON || map[y][x] == GRASS || map[y][x] == ICE ) 
	{
		return true;
	}
	else  
	{	
		return false;
	}
}



Tank.prototype.shot = function()
{
	if(!this.isShot)
	{	
		this.isShot = true;
		var bullet = new Bullet(this.x,this.y,this.type,this.dir);
		bullets.push(bullet);
	}
};



Tank.prototype.checkHit = function()
{
	var j;
	for (j = 0; j < tanks.length ; j++ )
	{	
		if (this == tanks[j]) 
		{
			continue;
		}
		var w = tanks[j].width;
		
		var p1a,p2a;
		
		
		if(stopTime	== 0)
		{
			p1a = movePoint(this);
			p2a = movePoint(tanks[j]);
		}
		
		else
		{
			p1a = movePoint(this);
			p2a = movePoint(tanks[j]);
			
			if(this.type == 0) 
			{
				p2a = new CPoint(tanks[j].x,tanks[j].y);
			}
			else 
			{
				p1a = new CPoint(this.x,this.y);
			}
		}
		
		var p1b = new CPoint(p1a.x + this.width, p1a.y + this.width);
		var p2b = new CPoint(p2a.x + w, p2a.y + w);
		
		var isHit = false;

		var minx = p1a.x > p2a.x ? p1a.x : p2a.x;
		var maxx = p1b.x < p2b.x ? p1b.x : p2b.x;
		var miny = p1a.y > p2a.y ? p1a.y : p2a.y;
		var maxy = p1b.y < p2b.y ? p1b.y : p2b.y;

		
		//if (minx <= maxx && miny <= maxy) 
		if (minx < maxx && miny < maxy) 
		{
			isHit = true;
		}	
		else 
		{
			isHit = false;
		}
		
		if( isHit )
		{
				var scale = 25;
				
				switch(this.dir)
				{
					case UP:	if ( tanks[j].y  + scale< this.y)
								{
									return true;
								}
								break;
					case DOWN:	if ( tanks[j].y  > this.y + scale)
								{
									return true;
								}
								break;
					case LEFT:	if ( tanks[j].x + scale < this.x)
								{
									return true;
								}
								break;
					case RIGHT:	if ( tanks[j].x  > this.x + scale) 
								{
									return true;
								}
								break;
				}
		}
	}
		
	return false;
};

function movePoint(tank)
{
	switch(tank.dir)
	{
		case UP: return new CPoint(tank.x, tank.y - tank.speed);
		case DOWN: return new CPoint(tank.x, tank.y + tank.speed);
		case LEFT: return new CPoint(tank.x - tank.speed, tank.y);
		case RIGHT: return new CPoint(tank.x + tank.speed, tank.y);
		default:return NULL;
	}
}


function CPoint(x,y)
{
	this.x = x;
	this.y = y;
}


function updataTanks()
{
	var i;
	var astar_map = new Array(25);

	for(i=0; i<25; i++)
		astar_map[i] = new Array(25);

	preprocess_map(map, astar_map);

	for(i = playerNum; i < tanks.length ; i ++)
	{
		if(stopTime == 0) tanks[i].moveFree(astar_map);		
		tanks[i].updata();
	}
	
	if(stopTime != 0) 
	{
		stopTime--;
	}
	
	for(var i = 0; i < playerNum; i ++)
	{
		tanks[i].updata();
	}
}

function drawTanks()
{
	for(var i = 0; i < tanks.length ; i ++)
	{
		tanks[i].draw("main");
	}
}






