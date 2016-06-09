var canv = null;
var ctx = null;
var fps = null;

const COLLISION_TOP	=	1;
const COLLISION_LEFT	=	2;
const COLLISION_RIGHT	=	4;
const COLLISION_BOTTOM	=	8;

function set_fps(_fps_){
	if(!_fps_)
		return fps;
	fps = 1000/_fps_;
}

function __clear__(){
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canv.width, canv.height);
}

function __draw__(obj){
	ctx.fillStyle = obj.color;
	ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function __update__(obj, data){
	obj.x = data.x;
	obj.y = data.y;
	obj.width = data.width;
	obj.height = data.height;
	obj.color = data.color;
	obj.show = data.show;
}

function __collision__(obj1, obj2){
	function colision(){
		return (
				(obj1.x+obj1.width >= obj2.x) &&
				(obj1.x <= obj2.x+obj2.width) &&
				(obj1.y+obj1.height >= obj2.y) &&
				(obj1.y <= obj2.y+obj2.height)
			) ? true : false;
	}

	if(!colision())
		return false;

	if(obj1.y + obj1.height >= obj2.y){ // Top Colision
		var zero = obj1.x+obj1.width-obj2.x;
		var valu = obj2.x+obj2.width-obj2.x+obj1.width;
		var perc = zero*100/valu;
		return [COLISION_TOP, perc];
	}/*else TODO HACK
	if(obj1.y <= obj2.y+obj2.height){ // Bottom Colision
		var zero = obj1.x+obj1.width-obj2.x;
		var valu = obj2.x+obj2.width;
		var perc = zero*100/valu;
		return [COLISION_BOTTOM, perc];
	}else
	if(obj1.x + obj1.width >= obj2.x){ // Left Colision
		var zero = obj1.y+obj1.height-obj2.y;
		var valu = obj2.y+obj2.height;
		var perc = zero*100/valu;
		return [COLISION_LEFT, perc];
	}else
	if(obj1.x <= obj2.x + obj2.width){ // Right Colision
		var zero = obj1.y+obj1.height-obj2.y;
		var valu = obj2.y+obj2.height;
		var perc = zero*100/valu;
		return [COLISION_RIGHT, perc];
	}*/

	return true;
}
// 10 10
// 10 20
function Cube(x, y,width, height, color){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.color = color;
	this.show = true;

	this.collision = function(obj){
		return __collision__(this, obj);
	};

	this.draw = function(){
		__draw__(this);
	}

	return this;
}

function Hero(x,y,width, height, color){
	this.head = new Cube(x,y,width, height*0.1, "#fbbcbc");
	this.body = new Cube(x,y+height*0.1, width, height*0.9, color);
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.show = true;

	this.step = function(){
		head_up = {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height*0.1,
			color: '#fbbcbc',
			show: this.show,
		};
		body_up = {
			x: this.x,
			y: this.y+this.height*0.1,
			width: this.width,
			height: this.height*0.9,
			color: this.color,
			show: this.show,
		};
		__update__(this.head, head_up);
		__update__(this.body, body_up);
	}
	this.draw = function(){
		__draw__(this.head);
		__draw__(this.body);
	}

	return this;
}

var utils_start = function(callback){
	var back = window.onload;

	window.onload = function(){
		var main = document.body;
		main.innerHTML = "<canvas id=\"canv\" width='"+window.innerWidth+"' height='"+window.innerHeight+"'></canvas>";

		canv = document.getElementById('canv');
		ctx = canv.getContext("2d");
		__clear__();
		if(back)
			back();
		callback();
	}
}
