set_fps(60);

function game_start(){
	var hero = new Hero(64,/*canv.height-200*/6,16,64,'#123456');
	var floor = new Cube(0, canv.height-136, canv.width, 8, '#aaaaaa');
	var blocks = new Array();
	var game_speed = 4;
	var score = 0;
	var title = document.getElementById('title');

	for(var x=0; x<2; x++)
		blocks.push(new Cube(canv.width+Math.random()*canv.width,
					canv.height-300+Math.random()*300,
					32,32,'#9a6be2'));

	var count = 0;
	var inter = null;
	hero.speed = 3;
	hero.acell = 0.89;

	var inter = null;
	var inters = null;

	var jump = true;
	window.onkeydown = function(evt){
		if(jump && evt.key == " "){
			jump = false;
		}
	}

	function _score(){
		score += 1;
		title.innerHTML = "Score "+score;
	}

	function _interval(){
		__clear__();

		count += 1;
		count = count % 500;
		if(count == 0)
			game_speed += game_speed > 17 ? 0 : 1;
		
		hero.speed += hero.acell;
		hero.speed = hero.speed > 9 ? 9 : hero.speed;
		if(hero.collision(floor)){
			if(jump)
				hero.speed = 0;
			else{
				hero.speed -= 18;
				jump = true;
			}
		}
		hero.y += hero.speed;
		
		hero.step();
		hero.draw();
		floor.draw();
		for(var x=0; x<2; x++){
			blocks[x].x -= game_speed;
			if(blocks[x].collision(hero)){
				alert("Score: "+score);
				clearInterval(inters);
				clearInterval(inter);
			}
			blocks[x].draw();
			if(blocks[x].x < blocks[x].width){
				delete blocks[x];
				blocks[x] = new Cube(canv.width+Math.random()*canv.width, canv.height-300+Math.random()*300,32,32,'#9a6be2');
			}
		}
	}

	inter = setInterval(_interval, fps);
	inters = setInterval(_score, 860);
}

utils_start(game_start);
