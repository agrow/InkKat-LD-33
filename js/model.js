
var Model = (function() {
var scope;
	
// Constructor ///////////////////////////////////////////////////
var Model = function(){
	scope = this;  // Works only because Model is a singleton
	
	this.humanParts = [];
	this.catParts = [];
	
	// indexed by divID of part
	this.partMap = [];
	
	this.abilities = [];
	this.abilityMap = [];
	this.selectedAbility;
	
	this.cat = {
		bottom: {x:0, y:0},
		sound: 0,
	};
	
	this.human = {
		sound: 0,
		soundQueued: false,
	};
	
	this.sleep = 100;
	this.excitement = 0;
	this.time = 0;
	
	this.initAbilities();
};

/* cat abilities
	 *  var head = this.initPart();
		var teeth = this.initPart();
		var tongue = this.initPart();
		var paws = this.initPart();
		var voice = this.initPart();
	 */
Model.prototype.initAbilities = function(){
	this.abilities.push({ 
		divID:"headAbility",
		display: "Nuzzle",
		excitementBonus: 20,
		sleepPenalty: 4,
		excitementScale: .1,
		cooldown: 5,
		currCooldown:0
	 });
	this.abilities.push({ 
		divID:"teethAbility",
		display: "Bite",
		excitementBonus: 40,
		sleepPenalty: 10,
		excitementScale: .3,
		cooldown: 10,
		excitementThreshold: 50,
		currCooldown:0
	 });
	this.abilities.push({ 
		divID:"tongueAbility" ,
		display: "Lick",
		excitementBonus: 10,
		sleepPenalty: 2,
		excitementScale: .1,
		cooldown: 5,
		currCooldown:0
	 });
	this.abilities.push({ 
		display: "Paw",
		divID:"pawAbility" ,
		excitementBonus: 30,
		sleepPenalty: 8,
		excitementScale: .15,
		cooldown: 5,
		excitementThreshold: 20,
		currCooldown:0
	 });
	this.abilities.push({ 
		divID:"voiceAbility" ,
		display: "Meow",
		excitementBonus: 15,
		sleepPenalty: 5,
		excitementScale: .05,
		cooldown: 3,
		currCooldown:0
	 });
	
	for(var i = 0; i < this.abilities.length; i++){
		this.abilityMap[this.abilities[i].divID] = this.abilities[i];
	}
	
	this.selectedAbility = this.abilityMap["voiceAbility"];
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
	
	global.controller.playSound("breathingSounds", 0, .5);
	this.human.soundQueued = true;
	// Add wiggle room 
	//this.human.sound += 1;
};

Model.prototype.buildSleepingParts = function(){
	// NOTE: ORDER MATTERS. THis is the order that update will run.
	var whole = this.initPart("humanWhole", "human");;
	var head = this.initPart("humanHead", "human");
	var eye1 = this.initPart("humanEye1", "human");
	var eye2 = this.initPart("humanEye2", "human");
	var nose = this.initPart("humanNose", "human");
	var mouth = this.initPart("humanMouth", "human");
	//var hair = this.initPart("humanHair", "human");
	var neck = this.initPart("humanNeck", "human");
	var chest = this.initPart("humanChest", "human");
	var legs1 = this.initPart("humanLegs1", "human");
	var legs2 = this.initPart("humanLegs2", "human");
	
	var current = whole;
	current.pos.x = 0; current.pos.y = 150;
	current.width = 1000; current.height = 375;
	current.type = "whole";
	current.img="bg.png"; 
	
	
	var current = head;
	current.pos.x = 720; current.pos.y = 315;
	current.width = 1000-current.pos.x; current.height = 180;
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
	current.pos.x = 787; current.pos.y = 377;
	current.width = 30; current.height = 30;
	current.type = "mouth"; 
	current.img = "humanMouth.png";
	
	
	current = neck;
	current.pos.x = 725; current.pos.y = 355;
	current.width = 80; current.height = 80;
	current.type = "neck"; 
	 
	
	
	current = chest;
	current.pos.x = 320; current.pos.y = 275;
	current.width = 400; current.height = 500-current.pos.y;
	current.type = "chest"; 
	 
	
	current = legs1;
	current.pos.x = 0; current.pos.y = 350;
	current.width = 180; current.height = 500-current.pos.y;
	current.type = "legs"; 
	
	current = legs2;
	current.pos.x = 180; current.pos.y = 260;
	current.width = 180; current.height = 500-current.pos.y;
	current.type = "legs"; 
	 
};

Model.prototype.buildCatParts = function(){
	// NOTE: ORDER MATTERS. THis is the order that update will run.
	var body = this.initPart("catBody", "cat");
	var head = this.initPart("catHead", "cat");
	var eyes = this.initPart("catEyes", "cat");
	var mouth = this.initPart("catMouth", "cat");
	var ears = this.initPart("catEars", "cat");
	var fpaw1 = this.initPart("catFpaw1", "cat");
	var fpaw2 = this.initPart("catFpaw2", "cat");
	var bpaw1 = this.initPart("catBpaw1", "cat");
	var bpaw2 = this.initPart("catBpaw2", "cat");
	var tail = this.initPart("catTail", "cat");
	
	var current = body;
	current.width = 130; current.height = 80;
	current.type = "body"; 
	current.img = "catBody2.png";
	
	var current = head;
	current.width = 100; current.height = 40;
	current.type = "head"; 
	current.img = "catHead.png";
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 60;
		this.pos.y = scope.partMap["catBody"].pos.y - 40;
	};
	
	var current = eyes;
	current.width = 50; current.height = 20;
	current.type = "eye"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catHead"].pos.x + 25;
		this.pos.y = scope.partMap["catHead"].pos.y + 10;
	};
	current.img = "catBlink.gif";
	
	var current = mouth;
	current.width = 30; current.height = 30;
	current.type = "mouth"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catHead"].pos.x + 35;
		this.pos.y = scope.partMap["catHead"].pos.y + 20;
	};
	current.img = "catMouth.png";
	
	
	var current = ears;
	current.width = 40; current.height = 30;
	current.type = "ear"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catHead"].pos.x + 30;
		this.pos.y = scope.partMap["catHead"].pos.y - 15;
	};
	current.img = "catEars.png";
	
	
	var current = fpaw1;/////////////////////
	current.width = 20; current.height = 75;
	current.type = "fpaw"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 110;
		this.pos.y = scope.partMap["catBody"].pos.y + 30;
	};
	current.img = "frontLeg.png";
	
	var current = fpaw2;/////////////////////
	current.width = 20; current.height = 75;
	current.type = "fpaw"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 90;
		this.pos.y = scope.partMap["catBody"].pos.y + 40;
	};
	current.img = "frontLeg_2.png";
	
	var current = bpaw1;//////////////////////
	current.width = 40; current.height = 60;
	current.type = "bpaw"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 20;
		this.pos.y = scope.partMap["catBody"].pos.y + 40;
	};
	current.img = "backLeg.png";
	
	var current = bpaw2;////////////////////
	current.width = 40; current.height = 60;
	current.type = "bpaw"; 
	 
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x + 5;
		this.pos.y = scope.partMap["catBody"].pos.y + 50;
	};
	current.img = "backLeg_2.png";
	
	var current = tail;//////////////////////
	current.width = 80; current.height = 80;
	current.type = "tail"; 
	
	current.updatePos = function(){
		this.pos.x = scope.partMap["catBody"].pos.x - 20;
		this.pos.y = scope.partMap["catBody"].pos.y - 55;
	};
	current.img = "tail_cropped.gif";
};

Model.prototype.finishBuildingParts = function(){
	var current;
	for(var i = 0; i < this.humanParts.length; i++){
		current = this.humanParts[i];
		current.onClick = this.clickHuman;
		global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
		if(current.img !== undefined){
			global.view.appendImgToDiv(current.img, current.divID, current.width, current.height);
		}
	}
	for(var i = 0; i < this.catParts.length; i++){
		current = this.catParts[i];
		global.view.makeBodyDiv(current.divID, current.pos.x, current.pos.y, current.width, current.height, current.onClick);
		if(current.img !== undefined){
			global.view.appendImgToDiv(current.img, current.divID, current.width, current.height);
			$("#" + current.divID).css("zIndex", 4);
		}
	}
	
	$("#catBody").css("zIndex", 5);
	$("#catFpaw2").css("zIndex", 6);
	$("#catBpaw2").css("zIndex", 6);
	
	$("#humanMouth").css("zIndex", 2);
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
	if(global.win === false){
		if($(this)[0].id !== "humanWhole"){
			global.model.moveCatBottomToPosition(posX, posY);
			global.model.activateAbility();
		} else {
			if(global.model.selectedAbility.divID === "voiceAbility")
			global.model.activateAbility();
		}
	}
};

/* cat abilities
	 *  var head = this.initPart();
		var teeth = this.initPart();
		var tongue = this.initPart();
		var paws = this.initPart();
		var voice = this.initPart();
	 */
Model.prototype.activateAbilitySound = function(){
	console.log("trying to play sound for... ", this.selectedAbility.divID);
	if(this.selectedAbility.divID === "headAbility"){
		global.controller.playSound("scratchClothSounds", 0, 1); 
	} else if(this.selectedAbility.divID === "teethAbility"){
		global.controller.playSound("biteSounds", 0, 1); 
	} else if(this.selectedAbility.divID === "tongueAbility"){
		global.controller.playSound("scratchFaceSounds", 0, 1); 
	} else if(this.selectedAbility.divID === "pawAbility"){
		global.controller.playSound("patSounds", 0, 1); 
	} else if(this.selectedAbility.divID === "voiceAbility"){
		if(this.excitement < 70){
			global.controller.playSound("meowSounds", 0, .5); 
		} else {
			global.controller.playSound("meowSounds", .5, 1); 
		}
	}
};

// NOTE: Previously, the ability should have been set. 
Model.prototype.activateAbility = function(){
	
	if(this.selectedAbility.currCooldown === 0){
		console.log(" to activate ability", this.selectedAbility.divID);
		//console.log(this.selectedAbility.sleepPenalty, this.excitement, this.selectedAbility.excitementScale);
		this.activateAbilitySound();
		
		this.excitement += this.selectedAbility.excitementBonus;
		this.sleep -= this.selectedAbility.sleepPenalty + (this.excitement * this.selectedAbility.excitementScale);
		if(this.excitement > 100) this.excitement = 100;
		if(this.sleep > 100) this.sleep = 100;
		
		//console.log(this.excitement, this.sleep);
		
		var excite = global.bars["exciteValue"];
		var sleep = global.bars["sleepValue"];
		global.view.setDivDimensions("exciteValue", excite.scale* global.model.excitement, excite.height); 
		global.view.setDivDimensions("sleepValue", sleep.scale* global.model.sleep, sleep.height); 
		
		this.selectedAbility.currCooldown = this.selectedAbility.cooldown;
	}
};
	
Model.prototype.processingSetup = function(){
	global.processing.size(global.canvasWidth, global.canvasHeight);
	console.log("Hello from processing setup!", global.canvasWidth, global.canvasHeight);
};

Model.prototype.processingDraw = function(){
	global.processing.background(100);
	global.model.time++;
	
	global.processing.textSize(14);
    global.processing.text("Excitement", 15, 30); 
    global.processing.text("Sleep", 15, 70); 
    
    
    
	if(global.win === false){
		// Check win condition
		if(global.model.sleep <= 0){
			global.view.showWin();
			return;
		}
		
			// Sound check for human breathing (60 frames / second)
	    if(global.model.human.sound > 0 && global.model.human.soundQueued === true){
	    		global.model.human.sound-= 1/60; 
	    		if(global.model.human.sound <= 0){
	    			global.model.human.soundQueued = false;
	    		}
	    	}
	    
		//console.log("human.sound...?", global.model.human.sound, global.model.human.soundQueued);
	    if(global.model.human.sound <= 0 && global.model.human.soundQueued === false){
	    	if(global.model.sleep < 50){
	    		global.controller.playSound("breathingSounds", 0, .5);
	    	} else {
	    		global.controller.playSound("breathingSounds", .5, 1);
	    	}
	    	global.model.human.soundQueued = true;
	    }
		
		// Check ability unlock
		
		//console.log("draw...?");
		//console.log(global.model.time, global.model.time % 500);
		if(global.model.time % 10 === 0){
			for(var i = 0; i < global.model.abilities.length; i++){
				// Decrement cooldowns
				if(global.model.abilities[i].currCooldown > 0) global.model.abilities[i].currCooldown--;
			}
			
			if(global.model.time % 20 === 0){
			//console.log("incrementing values");
				
				if(global.model.excitement > 0) global.model.excitement--;
				var excite = global.bars["exciteValue"];
				global.view.setDivDimensions("exciteValue", excite.scale* global.model.excitement, excite.height); 
				
				if(global.model.time % 40 === 0){
					if(global.model.sleep < 100) global.model.sleep++;
					var sleep = global.bars["sleepValue"];
					global.view.setDivDimensions("sleepValue", sleep.scale* global.model.sleep, sleep.height); 
				}
			}
		}
	}
};

return Model;
})();