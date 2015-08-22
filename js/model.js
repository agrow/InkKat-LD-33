
var Model = (function() {

	
// Constructor ///////////////////////////////////////////////////
var Model = function(){
	this.sleepingParts = [];
	this.catParts = [];
	
	/* cat abilities
	 *  var head = this.initPart();
		var teeth = this.initPart();
		var tongue = this.initPart();
		var paws = this.initPart();
		var voice = this.initPart();
	 */
	
};

Model.prototype.initPart = function(){
	return {
		pos:{x:0, y:0},
		width: 0,
		height: 0,
		onClick: null,
		type: "",
		owner: "",
		divID: "",
	};
};

Model.prototype.initGameViewElements = function(){
	
	this.buildSleepingParts();
	this.buildCatParts();
};

Model.prototype.buildSleepingParts = function(){
	var head = this.initPart();
	var eye1 = this.initPart();
	var eye2 = this.initPart();
	var nose = this.initPart();
	var mouth = this.initPart();
	var hair = this.initPart();
	var neck = this.initPart();
	var chest = this.initPart();
	var legs = this.initPart();
	
	var current = head;
	current.pos.x = 800; current.pos.y = 325;
	current.width = 200; current.height = 150;
	current.type = "head"; current.owner = "human";
	current.divID = "humanHead";
	//id, x, y, width, height, onClick
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	current = eye1;
	current.pos.x = 900; current.pos.y = 355;
	current.width = 20; current.height = 30;
	current.type = "eye"; current.owner = "human";
	current.divID = "humanEye1";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	
	current = eye2;
	current.pos.x = 900; current.pos.y = 415;
	current.width = 20; current.height = 30;
	current.type = "eye"; current.owner = "human";
	current.divID = "humanEye2";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	current = nose;
	current.pos.x = 860; current.pos.y = 395;
	current.width = 30; current.height = 10;
	current.type = "nose"; current.owner = "human";
	current.divID = "humanNose";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	current = mouth;
	current.pos.x = 830; current.pos.y = 385;
	current.width = 10; current.height = 30;
	current.type = "mouth"; current.owner = "human";
	current.divID = "humanMouth";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	
	current = neck;
	current.pos.x = 720; current.pos.y = 375;
	current.width = 80; current.height = 70;
	current.type = "neck"; current.owner = "human";
	current.divID = "humanNeck";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	
	current = chest;
	current.pos.x = 320; current.pos.y = 275;
	current.width = 400; current.height = 500-current.pos.y;
	current.type = "chest"; current.owner = "human";
	current.divID = "humanChest";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	current = legs;
	current.pos.x = 0; current.pos.y = 325;
	current.width = 320; current.height = 500-current.pos.y;
	current.type = "legs"; current.owner = "human";
	current.divID = "humanLegs";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
};

Model.prototype.buildCatParts = function(){
	var head = this.initPart();
	var ear1 = this.initPart();
	var ear2 = this.initPart();
	var body = this.initPart();
	var fpaw1 = this.initPart();
	var fpaw2 = this.initPart();
	var bpaw1 = this.initPart();
	var bpaw2 = this.initPart();
	var tail = this.initPart();
	
	var current = head;
	current.pos.x = 500; current.pos.y = 100;
	current.width = 50; current.height = 40;
	current.type = "head"; current.owner = "cat";
	current.divID = "catHead";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	var current = ear1;
	current.pos.x = 498; current.pos.y = 80;
	current.width = 20; current.height = 20;
	current.type = "ear"; current.owner = "cat";
	current.divID = "catEar1";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	var current = ear2;
	current.pos.x = 532; current.pos.y = 80;
	current.width = 20; current.height = 20;
	current.type = "ear"; current.owner = "cat";
	current.divID = "catEar2";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	var current = body;
	current.pos.x = 470; current.pos.y = 140;
	current.width = 90; current.height = 100;
	current.type = "body"; current.owner = "cat";
	current.divID = "catBody";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	var current = fpaw1;//////////////////////
	current.pos.x = 532; current.pos.y = 160;
	current.width = 15; current.height = 100;
	current.type = "fpaw"; current.owner = "cat";
	current.divID = "catFpaw1";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	var current = fpaw2;//////////////////////
	current.pos.x = 510; current.pos.y = 160;
	current.width = 15; current.height = 100;
	current.type = "bpaw"; current.owner = "cat";
	current.divID = "catFpaw2";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	var current = bpaw1;//////////////////////
	current.pos.x = 470; current.pos.y = 200;
	current.width = 30; current.height = 60;
	current.type = "bpaw"; current.owner = "cat";
	current.divID = "catBpaw1";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	var current = bpaw2;////////////////////
	current.pos.x = 470; current.pos.y = 200;
	current.width = 30; current.height = 60;
	current.type = "bpaw"; current.owner = "cat";
	current.divID = "catBpaw2";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	var current = tail;//////////////////////
	current.pos.x = body.pos.x-80; current.pos.y = 220;
	current.width = 80; current.height = 20;
	current.type = "tail"; current.owner = "cat";
	current.divID = "catTail";
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
};

// Wishlist: add extra pieces
	
Model.prototype.processingSetup = function(){
	global.processing.size(global.canvasWidth, global.canvasHeight);
	console.log("Hello from processing setup!", global.canvasWidth, global.canvasHeight);
};

Model.prototype.processingDraw = function(){
	global.processing.background(100);
};

return Model;
})();