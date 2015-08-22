
var Model = (function() {
var scope;
	
// Constructor ///////////////////////////////////////////////////
var Model = function(){
	scope = this;  // Works only because Model is a singleton
	
	this.humanParts = [];
	this.catParts = [];
	
	// indexed by divID of part
	this.partMap = [];
	
	this.cat = {
		bottom: {x:0, y:0},
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
	
	if(owner === "human")  this.humanParts.push(part);
	else this.catParts.push(part);
	
	this.partMap[part.divID] = part;
	
	return part;
	
};

Model.prototype.initGameViewElements = function(){
	
	this.buildSleepingParts();
	this.buildCatParts();
	this.finishBuildingParts();
	
	this.updateCatPosition(500, 250);
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
	 
	
	current = eye1;
	current.pos.x = 900; current.pos.y = 355;
	current.updatePos = function(){
		this.pos.x = scope.partMap["humanHead"].pos.x + 100;
		this.pos.y = scope.partMap["humanHead"].pos.y + 30;
	};
	current.width = 20; current.height = 30;
	current.type = "eye"; 
	 
	
	current = eye2;
	current.pos.x = 900; current.pos.y = 415;
	current.width = 20; current.height = 30;
	current.type = "eye"; 
	 
	
	current = nose;
	current.pos.x = 860; current.pos.y = 395;
	current.width = 30; current.height = 10;
	current.type = "nose"; 
	 
	
	current = mouth;
	current.pos.x = 830; current.pos.y = 385;
	current.width = 10; current.height = 30;
	current.type = "mouth"; 
	 
	
	
	current = neck;
	current.pos.x = 720; current.pos.y = 365;
	current.width = 80; current.height = 80;
	current.type = "neck"; 
	 
	
	
	current = chest;
	current.pos.x = 320; current.pos.y = 275;
	current.width = 400; current.height = 500-current.pos.y;
	current.type = "chest"; 
	 
	
	current = legs;
	current.pos.x = 0; current.pos.y = 325;
	current.width = 320; current.height = 500-current.pos.y;
	current.type = "legs"; 
	 
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
	 
	
	
	var current = head;
	current.width = 50; current.height = 40;
	current.type = "head"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 70;
		this.pos.y = scope.partMap["catBody"].pos.y - 40;
	};
	
	var current = ear1;
	current.width = 20; current.height = 20;
	current.type = "ear"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catHead"].pos.x - 2;
		this.pos.y = scope.partMap["catHead"].pos.y - 20;
	};
	
	var current = ear2;
	current.width = 20; current.height = 20;
	current.type = "ear"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catHead"].pos.x +32;
		this.pos.y = scope.partMap["catHead"].pos.y - 20;
	};
	
	var current = fpaw1;/////////////////////
	current.width = 15; current.height = 80;
	current.type = "fpaw"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 110;
		this.pos.y = scope.partMap["catBody"].pos.y + 30;
	};
	
	var current = fpaw2;/////////////////////
	current.width = 15; current.height = 80;
	current.type = "fpaw"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 90;
		this.pos.y = scope.partMap["catBody"].pos.y + 40;
	};
	
	var current = bpaw1;//////////////////////
	current.width = 30; current.height = 60;
	current.type = "bpaw"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 20;
		this.pos.y = scope.partMap["catBody"].pos.y + 50;
	};
	
	var current = bpaw2;////////////////////
	current.width = 30; current.height = 60;
	current.type = "bpaw"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 5;
		this.pos.y = scope.partMap["catBody"].pos.y + 60;
	};
	
	var current = tail;//////////////////////
	current.width = 80; current.height = 30;
	current.type = "tail"; 
	
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x - 80;
		this.pos.y = scope.partMap["catBody"].pos.y - 20;
	};
};

Model.prototype.finishBuildingParts = function(){
	var current;
	for(var i = 0; i < this.humanParts.length; i++){
		current = this.humanParts[i];
		current.onClick = this.clickHuman;
		global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	}
	for(var i = 0; i < this.catParts.length; i++){
		current = this.catParts[i];
		global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
	}
};

// Wishlist: add extra pieces

Model.prototype.updateCatPosition = function(x, y){
	this.partMap["catBody"].pos.x = x;
	this.partMap["catBody"].pos.y = y;
	global.view.setDivPos(this.catParts[0].divID, this.catParts[0].pos);
	
	// 0 is the body
	for(var i = 1; i < this.catParts.length; i++){
		this.catParts[i].updatePos();
		global.view.setDivPos(this.catParts[i].divID, this.catParts[i].pos);
	}
	
	this.cat.bottom = {
		x: this.partMap["catFpaw1"].pos.x,
		y: this.partMap["catFpaw1"].pos.y + this.partMap["catFpaw1"].height
	};
};

// NOTE: this.findBottomToHead must have been called at least once for the values to be good
Model.prototype.moveCatBottomToPosition = function(x, y){
	var catBodyPos = this.partMap["catBody"].pos;
	
	this.updateCatPosition(x + (catBodyPos.x -this.cat.bottom.x), y + (catBodyPos.y - this.cat.bottom.y));
};

Model.prototype.clickHuman = function(e){
	var posX = e.pageX - global.view.$canvas.position().left;
    var posY = e.pageY - global.view.$canvas.position().top;
	console.log("clicked on Human", posX, posY);
	
	global.model.moveCatBottomToPosition(posX, posY);
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