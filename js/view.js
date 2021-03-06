
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
	
	this.makeBars(100, 15, 400, 20);
};

View.prototype.generateSplashScreen = function(){
	console.log("making openings splash?");
	this.makeDiv({
		id: "openingSplash",  class: "splash",
		top: global.canvasHeightOffset, left: global.canvasWidthOffset, 
		width:global.canvasWidth, height:global.canvasHeight,
		onClick: function(){
			global.view.hideOpening();
		}
	});
	
	this.$opening = $("openingSplash");
	
	this.$opening.css("zIndex", 3);
};

View.prototype.hideOpening = function(){
	console.log("starting...");
	this.$opening.hide(); 
};

View.prototype.restart = function(){
	
};

View.prototype.showWin = function(){

	console.log("YAY WIN WIN WIN WIN!!!");
	global.win = true;
	
	
	setTimeout(function(){
		global.controller.playSound("winSounds", 0, 1);	
		
		setTimeout(function(){
        	global.controller.playSound("purringSounds", 0, 1);	
    	}, 2500);	
    }, 500);
	
};

View.prototype.makeBars = function(x, y, width, height){
	var totalWidth = width;
	global.bars = [];
	
	var params = {
		id: "exciteFull", top: y + global.canvasHeightOffset, left: x+ global.canvasWidthOffset,
		width: totalWidth, height:height, class: "barDiv"
	};
	var $div = this.makeDiv(params);
	global.bars[params.id] = {
		id: params.id,
		$div: $div
	};
	$(document.body).append($div);
	$div.offset({top: params.top, left: params.left});
	$div.css("zIndex", 1);
	
	params = {
		id: "exciteValue", top: y + global.canvasHeightOffset, left: x+ global.canvasWidthOffset,
		width: 0, height:height, class: "barDiv" // VISABILITY TEST
	};
	$div = this.makeDiv(params);
	global.bars[params.id] = {
		id: params.id,
		$div: $div,
		height: height,
		scale:totalWidth/100
	};
	$(document.body).append($div);
	$div.offset({top: params.top, left: params.left});
	$div.css("zIndex", 2);
	
	params = {
		id: "sleepFull", top: y + height*2 + global.canvasHeightOffset, left: x+ global.canvasWidthOffset,
		width: totalWidth, height:height, class: "barDiv"
	};
	$div = this.makeDiv(params);
	global.bars[params.id] = {
		id: params.id,
		$div: $div
	};
	$(document.body).append($div);
	$div.offset({top: params.top, left: params.left});
	$div.css("zIndex", 1);
	
	params = {
		id: "sleepValue", top: y + height*2 + global.canvasHeightOffset, left: x+ global.canvasWidthOffset,
		width: totalWidth, height:height , class: "barDiv" /// VISABILITY TEST
	};
	$div = this.makeDiv(params);
	global.bars[params.id] = {
		id: params.id,
		$div: $div,
		height: height,
		scale:totalWidth/100
	};
	$(document.body).append($div);
	$div.offset({top: params.top, left: params.left});
	$div.css("zIndex", 2);
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
	console.log("making div", params.id);
	
	var $div = $("<div>", {id: params.id, class: params.class, width: params.width, height: params.height});
						
	if(params.onClick !== null) $div.click(params.onClick);
		
	return $div;
	
};

View.prototype.setDivPos = function(divID, pos){
	var str = "#" + divID;
	$(str).offset({top: pos.y + global.canvasHeightOffset, left: pos.x + global.canvasWidthOffset});
};

View.prototype.setDivDimensions = function(divID, width, height){
	var str = "#" + divID;
	$(str).width(width);
	$(str).height(height);
	//console.log("Setting div dimensions", divID, width, height);
};

View.prototype.appendImgToDiv = function(img, div, width, height, pos){
	var image = document.createElement("IMG");
	image.id = img;
	image.src = "media/art/" + img;
	document.getElementById(div).appendChild(image);
	document.getElementById(img).width = width;
	//document.getElementById(img).height = height;
	if(pos !== undefined) this.setDivPos(img, pos);
};


return View;
})();