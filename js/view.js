
var View = (function() {
	
var updateWindowSize = function(){
	global.windowWidth = window.innerWidth;
	global.windowHeight = window.innerHeight;
	
	$("#gameCanvas").width(global.canvasWidth);
	$("#gameCanvas").height(global.canvasHeight);
	
	global.canvasHeightOffset = 0;
	global.canvasWidthOffset = (global.windowWidth - global.canvasWidth)/2;
	console.log("canvasOffsets", global.canvasWidthOffset, global.canvasHeightOffset);
	
	$("#gameCanvas").offset({top: 0, left: (global.windowWidth - global.canvasWidth)/2});
};

var sketchProc = function(processing){
	global.processing = processing;
	
	processing.setup = global.model.processingSetup;
	processing.draw = global.model.processingDraw;
};
	
// Constructor ///////////////////////////////////////////////////
var View = function(){
	global.canvasWidth = 1000;
	global.canvasHeight = 500;
	
	updateWindowSize();
	
	var canvas = document.getElementById("gameCanvas");
	global.processingInstance = new Processing(canvas, sketchProc);
};
	
View.prototype.makeBodyDiv = function(id, x, y, width, height, onClick){
	var params = {
		id: id, class: "bodyDiv", 
		top: y + global.canvasHeightOffset, left: x + global.canvasWidthOffset, 
		width:width, height:height,
		onClick: onClick
		
	};
	
	var $bodyDiv = this.makeDiv(params);
	$(document.body).append($bodyDiv);
	
	$bodyDiv.offset({top: params.top, left: params.left});
};
	
View.prototype.makeDiv = function(params){
	console.log("making div");
	
	var $div = $("<div>", {id: params.id, class: params.class, width: params.width, height: params.height});
						
	if(params.onClick !== null) $div.click = params.onClick;
		
	return $div;
	
};

return View;
})();