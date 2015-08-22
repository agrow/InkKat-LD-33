
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
};
	

return Controller;
})();