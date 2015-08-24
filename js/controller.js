
var Controller = (function() {

var onCanvasClick = function(e){
	var posX = e.pageX - $(this).position().left;
    var posY = e.pageY - $(this).position().top;
	console.log("clicked on", posX, posY);
	if(global.win === false){
		//global.model.moveCatBottomToPosition(posX, posY);
		if(global.model.selectedAbility.divID === "voiceAbility")
		global.model.activateAbility();
	}
};
	
// Constructor ///////////////////////////////////////////////////
var Controller = function(){
	global.view.$canvas.click(onCanvasClick);
	this.abilityDivs = [];
	this.selectDiv;
	//this.makeBars(100, 15, 400, 20);
	this.makeAbilityDivs(580, 25, 20);
	
	// Sounds RANKED BY ENERGY LEVEL!
	// And sleep depth (0 = low, 100 = high)
	this.sounds = [];
	this.breathingSounds = []; this.sounds["breathingSounds"] = this.breathingSounds;
	this.snoringSounds = []; this.sounds["snoringSounds"] = this.snoringSounds;
	this.purringSounds = []; this.sounds["purringSounds"] = this.purringSounds;
	this.meowSounds = []; this.sounds["meowSounds"] = this.meowSounds;
	this.scratchClothSounds = []; this.sounds["scratchClothSounds"] = this.scratchClothSounds;
	this.scratchFaceSounds = []; this.sounds["scratchFaceSounds"] = this.scratchFaceSounds;
	this.patSounds = []; this.sounds["patSounds"] = this.patSounds;
	this.biteSounds = []; this.sounds["biteSounds"] = this.biteSounds;
	this.winSounds = []; this.sounds["winSounds"] = this.winSounds;
	
	this.loadSounds();
	
};

Controller.prototype.playSound = function(category, lowerBound, upperBound){
	//console.log("checking category", category);
	var sounds = this.sounds[category];
	console.log(sounds);
	var count = 0;
	while(count < 100){
		var index = Math.random() * sounds.length;
		//console.log("checking song at percent", index/sounds.length);
		if(index/sounds.length > lowerBound && index/sounds.length < upperBound){
			var audio = sounds[Math.floor(index)];
			//console.log("audio readyState?", audio.readyState);
			if(audio.readyState < 1){
				audio.addEventListener('loadedmetadata', function() {
				    audio.play(); 
				    
				    //console.log("playing...", audio);
					//audio.currentTime = 0;
					audio.play();
					global.playing = sounds[Math.floor(index)];
					//console.log("returning duration", audio.duration);
					global.model.human.sound = audio.duration;
				});
				return;
			} else {
				audio.play(); 
			    
			    //console.log("playing...", audio);
				//audio.currentTime = 0;
				audio.play();
				global.playing = sounds[Math.floor(index)];
				//console.log("returning duration", audio.duration);
				global.model.human.sound = audio.duration;
				return;
			}
		} 
		count++;
	}
	console.warn("Could not grab sound in that bound, try again", category, lowerBound, upperBound);
	return;
};

Controller.prototype.loadSounds = function(){
	console.log("Loading sounds...");
	this.breathingSounds.push(new Audio('media/sound/recorded/quietBreath1.mp3'));
	this.breathingSounds.push(new Audio('media/sound/recorded/closedBreath1.mp3'));
	this.breathingSounds.push(new Audio('media/sound/recorded/closedBreath2.mp3'));
	this.breathingSounds.push(new Audio('media/sound/recorded/closedBreath3.mp3'));
	this.breathingSounds.push(new Audio('media/sound/recorded/closedBreath4.mp3'));
	this.breathingSounds.push(new Audio('media/sound/recorded/closedBreath5.mp3'));
	this.breathingSounds.push(new Audio('media/sound/recorded/closedBreath6.mp3'));
	this.breathingSounds.push(new Audio('media/sound/recorded/breath1.mp3'));
	this.breathingSounds.push(new Audio('media/sound/recorded/breath2.mp3'));
	this.breathingSounds.push(new Audio('media/sound/recorded/breath3.mp3'));
	this.breathingSounds.push(new Audio('media/sound/recorded/breath4.mp3'));
	this.breathingSounds.push(new Audio('media/sound/recorded/breath5.mp3'));
	this.breathingSounds.push(new Audio('media/sound/recorded/breath6.mp3'));
	
	this.snoringSounds.push(new Audio('media/sound/recorded/snore1.mp3'));
	this.snoringSounds.push(new Audio('media/sound/recorded/snore2.mp3'));
	this.snoringSounds.push(new Audio('media/sound/recorded/snore3.mp3'));
	
	this.purringSounds.push(new Audio('media/sound/recorded/purr2.mp3'));
	this.purringSounds.push(new Audio('media/sound/recorded/purr4.mp3'));
	this.purringSounds[0].loop = true;
	this.purringSounds[1].loop = true;
	
	this.meowSounds.push(new Audio('media/sound/recorded/quietMeow1.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/mew1.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/meow4.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/meow1.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/meowPleading1.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/meowPleading2.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/meow3.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/mrow2.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/meow2.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/mrow1.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/mrow3.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/meowLong1.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/meowLong2.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/mrowLong1.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/mrowLong2.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/mrowLong3.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/mrow4.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/sharpMeow1.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/sharpMeow2.mp3'));
	this.meowSounds.push(new Audio('media/sound/recorded/sharpMeow3.mp3'));
	
	this.scratchFaceSounds.push(new Audio('media/sound/recorded/scratch4.mp3'));
	this.scratchFaceSounds.push(new Audio('media/sound/recorded/scratch5.mp3'));
	this.scratchFaceSounds.push(new Audio('media/sound/recorded/scratch6.mp3'));
	this.scratchFaceSounds.push(new Audio('media/sound/recorded/scratch7.mp3'));
	
	this.scratchClothSounds.push(new Audio('media/sound/recorded/scratchCloth1.mp3'));
	this.scratchClothSounds.push(new Audio('media/sound/recorded/scratchCloth2.mp3'));
	this.scratchClothSounds.push(new Audio('media/sound/recorded/scratchCloth3.mp3'));
	
	this.patSounds.push(new Audio('media/sound/recorded/pat1.mp3'));
	this.patSounds.push(new Audio('media/sound/recorded/pat2.mp3'));
	
	this.biteSounds.push(new Audio('media/sound/recorded/bite1.mp3'));
	this.biteSounds.push(new Audio('media/sound/recorded/bite2.mp3'));
	this.biteSounds.push(new Audio('media/sound/recorded/bite3.mp3'));
	
	this.winSounds.push(new Audio('media/sound/recorded/youwin.mp3'));
};
	
Controller.prototype.makeAbilityDivs = function(startx, starty, dim){
	var widthMarker = startx;
	
	for(var i = 0; i < global.model.abilities.length; i++){
		var params = {
			id: global.model.abilities[i].divID, top: starty + global.canvasHeightOffset, left: widthMarker+ global.canvasWidthOffset,
			width: dim*3, height:dim, class: "abilityDiv",
			onClick: function(){
				if(global.win === false){
					global.model.selectedAbility = global.model.abilityMap[$(this).attr('id')];
					global.controller.selectAbility();
				}
			}
		};
		var $div = global.view.makeDiv(params);
		global.bars[params.id] = {
			id: params.id,
			$div: $div
		};
		$div.text(global.model.abilities[i].display);
		$(document.body).append($div);
		$div.offset({top: params.top, left: params.left});
		$div.css("zIndex", 2);
		global.model.abilities[i].$div = $div;
		this.abilityDivs.push($div);
		
		widthMarker += 80;
	}
	
	params = {
		id: "abilitySelect", top: starty - 7 + global.canvasHeightOffset, left: widthMarker+ global.canvasWidthOffset,
		width: dim*3 +12, height:dim + 12, class: "abilityDiv"
	};
	var $div = global.view.makeDiv(params);
	global.bars[params.id] = {
		id: params.id,
		$div: $div
	};
	$(document.body).append($div);
	$div.offset({top: params.top, left: params.left});
	$div.css("zIndex", 1);
	this.selectDiv = $div;
		
	this.selectAbility();
};

Controller.prototype.selectAbility = function(){
	console.log("selecting ability", global.model.selectedAbility.divID);
	$div = global.model.selectedAbility.$div;
	var offset = $div.offset();
	global.view.setDivPos("abilitySelect", {x:offset.left-7 - global.canvasWidthOffset, y:offset.top-7 - global.canvasHeightOffset});
};

Controller.prototype.lockAbility = function(ability){
	
};

Controller.prototype.unlockAbility = function(ability){
	
};

return Controller;
})();