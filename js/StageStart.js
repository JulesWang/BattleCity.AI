function StageStart()
{
		this.time = -15;
		this.frame = 0;
		this.stageNum = new Num();
		this.num = true;
		
		this.xx = images["stageStart"][0];
		this.yy = images["stageStart"][1];
}

StageStart.prototype.draw = function(canvas)
{
	var temp;
	var myCanvas = document.getElementById(canvas);
	var graphics = myCanvas.getContext("2d");
	var img = document.getElementById("tankAll");
	
	if(this.frame < 1000) 
	{
		this.time++;
	}
	else 
	{
		gameState = STATE_PLAY;
		return;
	}
	
	this.frame = this.time * 15;
	temp = this.frame;
	
	if(this.frame >= 224 && this.frame < 700) 
	{
		temp = 224;
	}
	
	else if(this.frame >= 699) 
	{

		temp = (224 - (this.frame - 700));
		
		graphics.clearRect(0, 224, 512, 15);
		graphics.clearRect(0, temp, 512, 15);
		graphics.clearRect(0, 448 - temp, 512, 15);
		return;
	}
	
	else if(this.frame >= 925) 
	{
		temp = 0;
	}
	
	if(temp == 224) 
	{
		if(this.num) 
		{

			graphics.drawImage(img, this.xx, this.yy, 78, 14, 194, 208, 78, 14);
			this.stageNum.draw("stage", 308, 208, level, false);
			
			sound.play("stageStart")
			this.num = false;
			init();
			draw();
			scoreBoard.draw();
		}
		return;
	}
	
	graphics.fillStyle = "#7f7f7f";
	graphics.fillRect(0, temp, 512, 15);
	graphics.fillRect(0, 448 - temp - 15 , 512, 15);
	
	
};

StageStart.prototype.init = function()
{
	this.time = -15;
	this.frame = 0;
	this.num = true;
};