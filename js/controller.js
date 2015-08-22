
var Controller = (function() {

var onCanvasClick = function(e){
	var posX = e.pageX - $(this).position().left;
    var posY = e.pageY - $(this).position().top;
	console.log("clicked on", posX, posY);
	global.model.moveCatBottomToPosition(posX, posY);
};
	
// Constructor ///////////////////////////////////////////////////
var Controller = function(){
	global.view.$canvas.click(onCanvasClick);
	this.abilityDivs = [];
	//this.makeBars(100, 15, 400, 20);
	this.makeAbilityDivs(650, 25, 40);
};
	
Controller.prototype.makeAbilityDivs = function(startx, starty, dim){
	var widthMarker = startx;
	
	for(var i = 0; i < global.model.abilities.length; i++){
		var params = {
			id: global.model.abilities[i].id, top: starty + global.canvasHeightOffset, left: widthMarker+ global.canvasWidthOffset,
			width: dim, height:dim, class: "abilityDiv"
		};
		var $div = global.view.makeDiv(params);
		global.bars[params.id] = {
			id: params.id,
			$div: $div
		};
		$(document.body).append($div);
		$div.offset({top: params.top, left: params.left});
		$div.css("zIndex", 10);
		this.abilityDivs.push($div);
		
		widthMarker += 60;
	}
};

return Controller;
})();