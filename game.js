//Laying out the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 648;
canvas.height = 480;
document.body.appendChild(canvas);

//                    Images                 //

//Background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "background.png";

//Character
var charReady = false;
var charImage = new Image();
charImage.onload = function () {
	charReady = true;
};
charImage.src = "character.png";

//Collectible
var collReady = false;
var collImage = new Image();
collImage.onload = function () {
	collReady = true;
};
collImage.src = "collectible.png";

var character = {
	speed: 324,
	x: 0,
	y: 0
};

var collectible = {
	x: 0,
	y: 0
};

var collectiblePoints = 0;

//Input
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//Character reset to middle of map
var reset = function() {
	character.x = canvas.width / 2;
	character.y = canvas.height / 2;
	
//Random monster position
	collectible.x = 32 + (Math.random() * (canvas.width - 64));
	collectible.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function (modifier) {
	//Up Arrow
	if (38 in keysDown) {
		character.y -= character.speed * modifier;
	}
	//Down Arrow
	if (40 in keysDown) { 
		character.y += character.speed * modifier;
	}
	//Left
	if (37 in keysDown) {
		character.x -= character.speed * modifier;
	}
	//Right
	if (39 in keysDown) {
		character.x += character.speed * modifier;
	}

	// Are they touching?
	if (
		character.x <= (collectible.x + 32)
		&& collectible.x <= (character.x + 32)
		&& character.y <= (collectible.y + 32)
		&& collectible.y <= (character.y + 32)
	) {
		++collectiblePoints;
		reset();
	}
};

//Populate game board
// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (charReady) {
		ctx.drawImage(charImage, character.x, character.y);
	}

	if (collReady) {
		ctx.drawImage(collImage, collectible.x, collectible.y);
	}

	// Collectible score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Verdana";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Hardware collected: " + collectiblePoints, 32, 32);
};

var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};

// Cross-browser requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();

	



