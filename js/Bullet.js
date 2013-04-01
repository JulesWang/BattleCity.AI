function Bullet(x,y,type,dir,name)
{
	Sprite.call(this, x, y, "bullet", 6);
	
	this.type = type;
	this.speed = 6;
	this.dir = dir;
	this.name = name;
	
	initXY.call(this);
}

Bullet.prototype = new Sprite();

function initXY()
{
		switch(this.dir)
		{
			case UP:
					this.x += 13;
					this.y -= 3;
					break;
				
			case DOWN:
					this.x += 13;
					this.y += 32;
					break;
				
			case RIGHT:
					this.y += 13;
					this.x += 32;
					break;
				
			case LEFT:
					this.y += 13;
					this.x -= 3;
					break;
				
		}
}

Bullet.prototype.draw = function(canvas)
{
	var myCanvas = document.getElementById(canvas);
	var graphics = myCanvas.getContext("2d");
	var img = document.getElementById("tankAll");
	
	graphics.drawImage(img, 6 * this.dir + images[this.src][0], images[this.src][1], 6, 6, this.x + offerX, this.y + offerY, 6, 6) ;	
};

Bullet.prototype.move = function()
{
	switch(this.dir)
	{
		case UP:
			this.y -= this.speed;
			break;
		case DOWN:
			this.y += this.speed;
			break;
		case LEFT:
			this.x -= this.speed;
			break;
		case RIGHT:
			this.x += this.speed;
			break;
			
		
	}
};

Bullet.prototype.checkHit = function()
{
	var xx = [ parseInt((this.x - 4)/ 16), parseInt((this.x + 3) / 16), parseInt((this.x + 10) / 16)];
	var	yy = [ parseInt((this.y - 4) / 16), parseInt((this.y + 3) / 16), parseInt((this.y + 10) / 16)];
	
	if(xx[2] > 25) {xx[2] = 25;}
	if(yy[2] > 25) {yy[2] = 25;}
	if(xx[1] > 25) {xx[1] = 25;}
	if(yy[1] > 25) {yy[1] = 25;}
	if(xx[0] < 0)  {xx[0] = 0;}
	if(xx[0] < 0)  {yy[0] = 0;}
	
	var dir = this.dir;
	var isHit = false;

	if(this.x < 0 || this.y < 0 || this.x > 416 || this.y > 416)
	{
		if(this.type == 0)
		{
			sound.play("shootOver");
		}
		return true;
	}
	else 
	{
		var i,j;
		for(var k = 0 ; k < 2 ; k ++)
		{
			if(dir == UP || dir == DOWN)
			{
				j = 1;
				i = k;
			}
			else
			{
				i = 1;
				j = k;
			}
			var yj = yy[j];
			var xi = xx[i];
			
			var wallType = map[yj][xi];
			
			if(wallType == WALL || wallType == GRID || wallType > 5) 
			{
				isHit = true;
				
				
				if(wallType == WALL) 
				{ 
					switch(dir)
					{
						case UP :map[yj][xi] = 10;
							     break;
						case DOWN :map[yj][xi] = 11;
								   break;
						case LEFT :map[yj][xi] = 12;
								   break;
						case RIGHT :map[yj][xi] = 13;
									break;
					}
					
					clearWall(xi,yj,map[yj][xi]);
				}
				
				else if(wallType == GRID && this.type == 0)
				{
					sound.play("shootOver");
				}
				
				if (wallType == HOME ||  wallType == 8)
				{
					gameState = STATE_GAMEOVER;
					var bombFx = new BombFx(this.x, this.y, 0);
					bombFxs.push(bombFx);
					sound.play("bomb0");
					return true;
				}
				
				else if(wallType > 9)
				{
					map[yj][xi] = NON;
					
					var myCanvas = document.getElementById("wall");
					var graphics = myCanvas.getContext("2d");
					graphics.fillRect(xi * 16 + offerX,yj * 16 + offerY,16,16);
					
					switch(wallType)
					{
						case 10 :this.y -= 4;
							     break;
						case 11 :this.y += 4;
								 break;
						case 12 :this.x -= 4;
								 break;
						case 13 :this.x += 4;
								 break;
					}
				}
			}
		}	
		return isHit;
	}
};

function clearWall(xx,yy,type)
{
	var myCanvas = document.getElementById("wall");
	var graphics = myCanvas.getContext("2d");
	
	var x = xx * 16;
	var y = yy * 16;
	graphics.fillStyle = "000"
	switch(type)
	{
		case 10 :graphics.fillRect(x + offerX,y + offerY + 8,16,8);
				 break;
		case 11 :graphics.fillRect(x + offerX,y + offerY,16,8);
				 break;
		case 12 :graphics.fillRect(x + offerX + 8,y + offerY,8,16);
				 break;
		case 13 :graphics.fillRect(x + offerX,y + offerY,8,16);
				 break;
	}
}

Bullet.prototype.hitTanks = function()
{
	for(var i = 0;i < tanks.length;i ++ )
	{
		var xx = tanks[i].x;
		var yy = tanks[i].y;
		var isBomb = false;

		if(this.hitTestObject(tanks[i]) && tanks[i].type != this.type)
		{
			var tankScore;
			
			if(this.type == 0)                                        //子弹是自己发射的
			{
				tanks[i].life --;
				
				if(tanks[i].life == 0)
				{
					tankScore = tanks[i].score;
					
					tanks.splice(i,1);
					i --;
					isBomb = true;
					sound.play("bomb1");
				}	
			}
			
			else if(!tanks[i].isGod)
			{
				tanks[i].live --;
				scoreBoard.drawPlayerLife(tanks[i].name,tanks[i].live);
				sound.play("bomb0");
				if(tanks[i].live == 0)
				{
					tanks.splice(i,1);
					playerNum --;
					
					
					
					if(playerNum == 0) 
					{
						var bombFx = new BombFx(xx, yy, 0);
						bombFxs.push(bombFx);
						
						gameState = STATE_GAMEOVER;
						return;
					}
					
					continue;
				}
				
				initMyTank(tanks[i].name);
				tankScore = 0;
				isBomb = true;
			}
			
			
			if(isBomb)
			{
				var bombFx = new BombFx(xx, yy, tankScore);
				bombFxs.push(bombFx);
			}	
			
			if(tankNum >= 20 && tanks.length == playerNum) nextStage();
			return true;
		}
	}
	return false;
};



function updataBullets()
{
	for(var i = 0;i < bullets.length;i++)
	{
		bullets[i].move();
		
		if(bullets[i].type == 0)
		{
			for(var j = 0;j < bullets.length;j++)
			{
					if(i == j) {continue;}
					else if(bullets[i].hitTestObject(bullets[j]) && bullets[i].type == 0)
					{	
						var hitFx = new HitFx(bullets[i].x + 3,bullets[i].y + 3);
						hitFx.type = 1;
						hitFxs.push(hitFx);
						
						if(bullets[i].name == 1) {player1.time = player1.shotSpeed - 14;}
						else {player2.time = player2.shotSpeed - 14;}
						
						bullets.splice(i > j ? i : j, 1);
						bullets.splice(i < j ? i : j, 1);
						
						if(i < j) {i --;}
						else {i -= 2;}
						
						j = 1000;//退出循环
					}
			}
		}
	
		var isHit = false;
		
		if(i < 0) {return;}
		if(i >= bullets.length) {return;}
		
		if(bullets[i].checkHit()) 
		{
			isHit = true;//碰到墙壁
		}
		
		if(bullets[i].hitTanks())  
		{
			isHit = true;
		}//碰到坦克
	

		if(isHit && bullets[i]) 
		{
			if(bullets[i].type == 0) 
			{
				if(bullets[i].name == 1) {player1.time = player1.shotSpeed - 14;}
				else {player2.time = player2.shotSpeed - 14;}
			}
			var hitFx = new HitFx(bullets[i].x + 3,bullets[i].y + 3);
			bullets.splice(i,1);
			i --;
			hitFxs.push(hitFx);
		}
	}
}

function drawBullets()
{
	for(var i = 0; i < bullets.length ; i ++)
	{
		bullets[i].draw("main");
	}
}


