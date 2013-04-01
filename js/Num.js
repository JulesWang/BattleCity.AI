function Num()
{
	this.src = "num";
}

Num.prototype.draw = function(canvas, x, y, num, type)
{
	var myCanvas = document.getElementById(canvas);
	var graphics = myCanvas.getContext("2d");
	var img = document.getElementById("tankAll");
	
	if(num < 0) {num = 0;}
	
	var temp = num;
	var len = 0;
	var no = 0;
	
	var numx = images[this.src][0];
	var numy = images[this.src][1];
	
	if(type && num != 0)
	{
		while( temp != 0 )
		{
			temp =parseInt(temp / 10) ;
			len ++;
		}	
		x += ( (len - 1)  * 16 - 2 );
	}
	do
	{
		no = num % 10 ;
		graphics.clearRect(x , y , 14, 14) ;	
		graphics.drawImage(img,no * 14 + numx, numy, 14, 14, x ,y , 14, 14) ;	
		x -= 16 ;
		num = parseInt(num / 10);
	}while( num != 0 );
	
	return;
};














