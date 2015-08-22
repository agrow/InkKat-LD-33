
var View = (function() {
	
var updateWindowSize = function(){
	global.windowWidth = window.innerWidth;
	global.windowHeight = window.innerHeight;
	
	$("#gameCanvas").width(global.canvasWidth);
	$("#gameCanvas").height(global.canvasHeight);
	
	
	$("#gameCanvas").offset({top: 0, left: (global.windowWidth - global.canvasWidth)/2});
};
	
// Constructor ///////////////////////////////////////////////////
var View = function(){
	global.canvasWidth = 1000;
	global.canvasHeight = 600;
	
	updateWindowSize();
};
	

return View;
})();