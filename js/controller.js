
var Controller = (function() {

var onCanvasClick = function(e){
	var posX = e.pageX - $(this).position().left;
    var posY = e.pageY - $(this).position().top;
	console.log("clicked on", posX, posY);
	if(global.win === false){
		global.model.moveCatBottomToPosition(posX, posY);
		global.model.activateAbility();
	}
};
	
// Constructor ///////////////////////////////////////////////////
var Controller = function(){
	global.view.$canvas.click(onCanvasClick);
	this.abilityDivs = [];
	this.selectDiv;
	//this.makeBars(100, 15, 400, 20);
	this.makeAbilityDivs(650, 25, 40);
	
};
	
Controller.prototype.makeAbilityDivs = function(startx, starty, dim){
	var widthMarker = startx;
	
	for(var i = 0; i < global.model.abilities.length; i++){
		var params = {
			id: global.model.abilities[i].divID, top: starty + global.canvasHeightOffset, left: widthMarker+ global.canvasWidthOffset,
			width: dim, height:dim, class: "abilityDiv",
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
		$(document.body).append($div);
		$div.offset({top: params.top, left: params.left});
		$div.css("zIndex", 10);
		global.model.abilities[i].$div = $div;
		this.abilityDivs.push($div);
		
		widthMarker += 60;
	}
	
	params = {
		id: "abilitySelect", top: starty - 5 + global.canvasHeightOffset, left: widthMarker+ global.canvasWidthOffset,
		width: dim +10, height:dim + 10, class: "abilityDiv"
	};
	var $div = global.view.makeDiv(params);
	global.bars[params.id] = {
		id: params.id,
		$div: $div
	};
	$(document.body).append($div);
	$div.offset({top: params.top, left: params.left});
	$div.css("zIndex", 5);
	this.selectDiv = $div;
		
	this.selectAbility();
};

Controller.prototype.selectAbility = function(){
	console.log("selecting ability", global.model.selectedAbility.divID);
	$div = global.model.selectedAbility.$div;
	var offset = $div.offset();
	global.view.setDivPos("abilitySelect", {x:offset.left-5 - global.canvasWidthOffset, y:offset.top-5 - global.canvasHeightOffset});
};

Controller.prototype.lockAbility = function(ability){
	
};

Controller.prototype.unlockAbility = function(ability){
	
};

return Controller;
})();