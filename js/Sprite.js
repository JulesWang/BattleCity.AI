function Sprite(x,y,src,width)
{
	this.x = x;
	this.y = y;
	
	this.width = width;
	this.src = src;
}

Sprite.prototype.hitTestObject = function(obj)
{
	
	var minx = this.x > obj.x ? this.x :obj.x;
	var maxx = this.x + this.width < obj.x + obj.width ? this.x + this.width : obj.x + obj.width ;
	var miny = this.y > obj.y ? this.y : obj.y;
	var maxy = this.y + this.width < obj.y + obj.width ? this.y + this.width : obj.y + obj.width;
	
	if (minx <= maxx && miny <= maxy) {return true;}
	else {return false;}
};
