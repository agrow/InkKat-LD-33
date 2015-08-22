
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

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};
	
// Constructor ///////////////////////////////////////////////////
var View = function(){
	global.canvasWidth = 1000;
	global.canvasHeight = 500;
	
	updateWindowSize();
	
	this.canvas = document.getElementById("gameCanvas");
	this.$canvas = $("#gameCanvas");
	global.processingInstance = new Processing(this.canvas, sketchProc);
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
						
	if(params.onClick !== null) $div.click(params.onClick);
		
	return $div;
	
};

View.prototype.setDivPos = function(divID, pos){
	var str = "#" + divID;
	$(str).offset({top: pos.y + global.canvasHeightOffset, left: pos.x + global.canvasWidthOffset});
};

return View;
})();