function Food()
{
	Sprite.call(this, 0, 0, "food", 33);
	
	this.type = 3;
	this.time = 0;
	
}

Food.prototype = new Sprite();

Food.prototype.init = function()
{
	var myCanvas = document.getElementById("upp");
	var graphics = myCanvas.getContext("2d");
	graphics.clearRect(this.x + offerX,this.y + offerY,30,28);
	
	this.type = parseInt(Math.random() * 6);
	//if(this.type == 0 || this.type == 4) {this.init();}
	this.x = parseInt(Math.random() * 384);
	this.y = parseInt(Math.random() * 384);
};

Food.prototype.draw = function()
{
	var myCanvas = document.getElementById("upp");
	var graphics = myCanvas.getContext("2d");
	var img = document.getElementById("tankAll");
	
	var frame =parseInt(this.time/30);
	if(frame % 2) 
	{
		graphics.drawImage(img,30 * this.type + images[this.src][0], images[this.src][1], 30, 28, this.x + offerX, this.y + offerY, 30, 28) ;
	}	
	else 
	{
		graphics.clearRect(this.x + offerX,this.y + offerY,30,28);
	}
	return;
};

Food.prototype.updata = function()
{
	this.time ++;
};



function drawFood()
{
	food.draw("upp");
}

function updataFood()
{
	food.updata();
	
	for(var i = 0 ; i < playerNum; i ++)
	{
		if(tanks[i].hitTestObject(food))
		{
		
			switch(food.type)
			{
				case foodLife: 	tanks[i].live ++;
								scoreBoard.drawPlayerLife(tanks[i].name,tanks[i].live);
							   break;
				case foodGod:  tanks[i].godTime = 600;
							   tanks[i].isGod = true;
							   break;
				case foodHome: changeHome(true);
							   break;
				case foodStar: tanks[i].shotSpeed -= 10;
							   if(tanks[i].shotSpeed < 10) tanks[i].shotSpeed = 10;
							   break;
				case foodTime: stopTime = 800;
							   break;
				case foodBomb: tanksBomb(true);
							   break;
				default: return;
			}
			var temp = new Score(food.x + 15,food.y + 15,500);
			scoreNums.push(temp);
			
			tanks[i].score ++;
		    sound.play("food");
			food.type = foodNon;
		}
	}
	
	if(homeTime == 0) {changeHome(false);}
	if(homeTime >= 0) {homeTime--;}
}















