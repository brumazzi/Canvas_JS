var play = document.getElementById('play');
var canvas = null;
var bar = null;
var up = false;
var left = false;

function mouse_event(evt){
	bar.x = evt.clientX - bar.w/2;
}

function colide(obj1, obj2){
	return (obj1.x+obj1.w >= obj2.x && obj1.x <= obj2.x+obj2.w &&
			obj1.y+obj1.h >= obj2.y && obj1.y <= obj2.y+obj2.h) ?
		true : false;
}

function clear(c){
	if(!canvas)
		return false;

	c.fillStyle = "#000000";
	c.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(c, obj){
	clear(c);
	var blk = obj.block;

	c.fillStyle = "#000aaf";
	c.fillRect(obj.bar.x, obj.bar.y, obj.bar.w, obj.bar.h);
	c.fillStyle = "#f02222";
	c.fillRect(obj.ball.x, obj.ball.y, obj.ball.r, obj.ball.r);
	if(blk.exist){
		c.fillStyle = "#a206a2";
		c.fillRect(blk.x, blk.y, blk.w, blk.h);
	}
}

function game_play(c){
	var obj = {};
	var inter = null;
	obj['bar'] = {w:256,h:32,x:canvas.width/2-256/2,y:canvas.height-64};
	obj['ball'] = {r:16, x: canvas.width/2-8, y: canvas.height/2-8, w:16, h:16};
	obj['block'] = {x:canvas.width/2-64/2-260,y:canvas.height/2-64, w:64, h:24, exist: true};
	bar = obj.bar;

	function c_draw(){
		var ball = obj.ball;
		
		if(up)
			ball.y -= 4;
		else
			ball.y += 4;
		if(left)
			ball.x -= 4;
		else
			ball.x += 4;

		if(colide(ball, bar))
			up = true;
		if(ball.y <= 0)
			up = false;
		if(ball.x+ball.r >= canvas.width || ball.x <= 0)
			left = !left;
		if(colide(ball, obj.block)){
			obj.block.exist = false;
			up = !up;
			left = !left;
		}

		draw(c, obj);

		if(!obj.block.exist){
			alert('Game Over!');
			clearInterval(inter);
		}
	}

	inter = setInterval(c_draw, 1000/60);
}

window.onload = function(){
	var main = document.body;
	main.innerHTML = "<canvas id=\"canv\" width='"+window.innerWidth+"' height='"+window.innerHeight+"'></canvas>";

	canvas = document.getElementById("canv");
	var ctx = canvas.getContext("2d");
	window.onmousemove = mouse_event;

	game_play(ctx);
}
