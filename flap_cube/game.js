var canv = null;
var ctx = null;
const fps = 1000/60;
var score = 0;
var models = new Array();

function obj_colide(obj1, obj2){
	return (obj1.x+obj1.width >= obj2.x && obj1.x <= obj2.x+obj2.width && obj1.y+obj1.height >= obj2.y && obj1.y <= obj2.y+obj2.height) && (obj1.actor || obj2.actor) ? true : false;
}

function game_clear(){
	if(!canv)
		return null;
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function game_draw(){
	for(var x=0; x<models.length; x+=1){
		var obj = models[x];
		if(obj.show){
			ctx.fillStyle = obj.color;
			ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
		}
	}

	return true;
}

function mouse_event(evt){
	models[2].speed -= 5;
}

function game_start(){
	var inter = null;
	var ceil = {
		x: 0,
		y: 0,
		width: canv.width,
		height: 16,
		show: true,
		color: '#2c3e50',
		solid: true
	};
	var floor = {
		x: 0,
		y: canv.height-16,
		width: canv.width,
		height: 16,
		show: true,
		color: '#2c3e50',
		solid: true
	};
	var cube = {
		x: 32,
		y: canv.height/2,
		width: 32,
		height: 32,
		show: true,
		color: '#2980b9',
		speed: 0,
		acel: 0.2,
		solid: true,
		actor: true
	};
	models.push(ceil);
	models.push(floor);
	models.push(cube);

	function Block(){
		this.x = canv.width + Math.random()*512;
		this.y = 64 + Math.random() * (canv.height - 128);
		this.width = 120;
		this.height = 100;
		this.show = true;
		this.solid = true;
		this.color = '#3498db';
		this.speed = 10;
		this.acel = 0;
		this.refresh = true;

		return this;
	}

	models.push(new Block());
	models.push(new Block());
	models.push(new Block());

	var inter_s = setInterval(function(){
		score+=1;
		document.getElementById('score').innerHTML = 'Score: '+score;
	}, 2000);

	function step(){
		game_clear();

		cube.y += cube.speed;
		cube.speed += cube.acel;
		cube.speed = cube.speed > 10 ? 10 : cube.speed;
		cube.speed = cube.speed < -8 ? -8 : cube.speed;
		game_draw();
		
		for(var x=0; x<models.length; x+=1){
			for(var y=x+1; y<models.length; y+=1){
				if(obj_colide(models[x],models[y])){
					clearInterval(inter);
					clearInterval(inter_s);
					alert('Game Over');
					alert('Score '+score);
				}
			}
			if(models[x].refresh){
				if(models[x].x < -models[x].width){
					delete models[x];
					models[x] = new Block();
				}
				models[x].x -= models[x].speed;
			}
		}
	}
	var inter = setInterval(step,fps);
}

window.onload = function(){
	var w = window.innerWidth;
	var h = window.innerHeight;
	var main = document.body;
	main.innerHTML = "<canvas width='"+w+"' height='"+h+"' id='canvas'></canvas>";
	main.onclick = mouse_event;
	canv = document.getElementById('canvas');
	ctx = canv.getContext("2d");

	game_start();
}
