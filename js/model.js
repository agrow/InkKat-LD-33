
var Model = (function() {
var scope;
	
// Constructor ///////////////////////////////////////////////////
var Model = function(){
	scope = this;  // Works only because Model is a singleton
	
	this.sleepingParts = [];
	this.catParts = [];
	
	// indexed by divID of part
	this.partMap = [];
	
	this.cat = {
		bottom: {x:0, y:0},
		bottomToHead: {x:0, y:0}
	};
	/* cat abilities
	 *  var head = this.initPart();
		var teeth = this.initPart();
		var tongue = this.initPart();
		var paws = this.initPart();
		var voice = this.initPart();
	 */
	
};

Model.prototype.initPart = function(id, owner){
	
	var part = {
		pos:{x:0, y:0},
		width: 0,
		height: 0,
		onClick: null,
		type: "",
		owner: owner,
		divID: id,
		updatePos: null,
	};
	
	if(owner === "human") this.sleepingParts.push(part);
	else this.catParts.push(part);
	
	this.partMap[part.divID] = part;
	
	return part;
	
};

Model.prototype.initGameViewElements = function(){
	
	this.buildSleepingParts();
	this.buildCatParts();
	
	this.updateCatPosition(500, 250);
	this.findBottomToHead();
};

Model.prototype.buildSleepingParts = function(){
	// NOTE: ORDER MATTERS. THis is the order that update will run.
	var head = this.initPart("humanHead", "human");
	var eye1 = this.initPart("humanEye1", "human");
	var eye2 = this.initPart("humanEye2", "human");
	var nose = this.initPart("humanNose", "human");
	var mouth = this.initPart("humanMouth", "human");
	//var hair = this.initPart("humanHair", "human");
	var neck = this.initPart("humanNeck", "human");
	var chest = this.initPart("humanChest", "human");
	var legs = this.initPart("humanLegs", "human");
	
	var current = head;
	current.pos.x = 800; current.pos.y = 325;
	current.width = 1000-current.pos.x; current.height = 150;
	current.type = "head"; 
	//id, x, y, width, height, onClick
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	current = eye1;
	current.pos.x = 900; current.pos.y = 355;
	current.updatePos = function(){
		this.pos.x = scope.partMap["humanHead"].pos.x + 100;
		this.pos.y = scope.partMap["humanHead"].pos.y + 30;
	};
	current.width = 20; current.height = 30;
	current.type = "eye"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	current = eye2;
	current.pos.x = 900; current.pos.y = 415;
	current.width = 20; current.height = 30;
	current.type = "eye"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	current = nose;
	current.pos.x = 860; current.pos.y = 395;
	current.width = 30; current.height = 10;
	current.type = "nose"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	current = mouth;
	current.pos.x = 830; current.pos.y = 385;
	current.width = 10; current.height = 30;
	current.type = "mouth"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	
	current = neck;
	current.pos.x = 720; current.pos.y = 365;
	current.width = 80; current.height = 80;
	current.type = "neck"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	
	current = chest;
	current.pos.x = 320; current.pos.y = 275;
	current.width = 400; current.height = 500-current.pos.y;
	current.type = "chest"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	current = legs;
	current.pos.x = 0; current.pos.y = 325;
	current.width = 320; current.height = 500-current.pos.y;
	current.type = "legs"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
};

Model.prototype.buildCatParts = function(){
	// NOTE: ORDER MATTERS. THis is the order that update will run.
	var body = this.initPart("catBody", "cat");
	var head = this.initPart("catHead", "cat");
	var ear1 = this.initPart("catEar1", "cat");
	var ear2 = this.initPart("catEar2", "cat");
	var fpaw1 = this.initPart("catFpaw1", "cat");
	var fpaw2 = this.initPart("catFpaw2", "cat");
	var bpaw1 = this.initPart("catBpaw1", "cat");
	var bpaw2 = this.initPart("catBpaw2", "cat");
	var tail = this.initPart("catTail", "cat");
	
	
	var current = body;
	current.width = 130; current.height = 70;
	current.type = "body"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	
	
	var current = head;
	current.width = 50; current.height = 40;
	current.type = "head"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 70;
		this.pos.y = scope.partMap["catBody"].pos.y - 40;
	};
	
	var current = ear1;
	current.width = 20; current.height = 20;
	current.type = "ear"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	current.updatePos = function(){
		this.pos.x = scope.partMap["catHead"].pos.x - 2;
		this.pos.y = scope.partMap["catHead"].pos.y - 20;
	};
	
	var current = ear2;
	current.width = 20; current.height = 20;
	current.type = "ear"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	current.updatePos = function(){
		this.pos.x = scope.partMap["catHead"].pos.x +32;
		this.pos.y = scope.partMap["catHead"].pos.y - 20;
	};
	
	var current = fpaw1;/////////////////////
	current.width = 15; current.height = 80;
	current.type = "fpaw"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 110;
		this.pos.y = scope.partMap["catBody"].pos.y + 30;
	};
	
	var current = fpaw2;/////////////////////
	current.width = 15; current.height = 80;
	current.type = "fpaw"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 90;
		this.pos.y = scope.partMap["catBody"].pos.y + 40;
	};
	
	var current = bpaw1;//////////////////////
	current.width = 30; current.height = 60;
	current.type = "bpaw"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 20;
		this.pos.y = scope.partMap["catBody"].pos.y + 50;
	};
	
	var current = bpaw2;////////////////////
	current.width = 30; current.height = 60;
	current.type = "bpaw"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 5;
		this.pos.y = scope.partMap["catBody"].pos.y + 60;
	};
	
	var current = tail;//////////////////////
	current.width = 80; current.height = 30;
	current.type = "tail"; 
	global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x - 80;
		this.pos.y = scope.partMap["catBody"].pos.y - 20;
	};
};

// Wishlist: add extra pieces

// Needs to be called after updateCatPosition is called at least once
// NOTE: Should never change so long as the leg update doesn't change
Model.prototype.findBottomToHead = function(){
	var headPos = this.partMap["catBody"].pos;
	this.cat.bottom = {
		x: this.partMap["catFpaw1"].pos.x,
		y: this.partMap["catFpaw1"].pos.y + this.partMap["catFpaw1"].height
	};
	
	this.cat.findBottomToHead = {
		x: this.cat.bottom.x - headPos.x,
		y: this.cat.bottom.y - headPos.y
	};
};

Model.prototype.updateCatPosition = function(x, y){
	this.partMap["catBody"].pos.x = x;
	this.partMap["catBody"].pos.y = y;
	global.view.setDivPos(this.catParts[0].divID, this.catParts[0].pos);
	
	// 0 is the body
	for(var i = 1; i < this.catParts.length; i++){
		this.catParts[i].updatePos();
		global.view.setDivPos(this.catParts[i].divID, this.catParts[i].pos);
	}
};
	
Model.prototype.processingSetup = function(){
	global.processing.size(global.canvasWidth, global.canvasHeight);
	console.log("Hello from processing setup!", global.canvasWidth, global.canvasHeight);
};

Model.prototype.processingDraw = function(){
	global.processing.background(100);
};

return Model;
})();