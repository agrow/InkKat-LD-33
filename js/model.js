
var Model = (function() {

	
// Constructor ///////////////////////////////////////////////////
var Model = function(){
};
	
Model.prototype.processingSetup = function(){
	
};

Model.prototype.processingDraw = function(){
	background(127);
    stroke(-200.0);
    line(0,25,width,25);
    stroke(600.0);
    line(0,75,width,75);
};

return Model;
})();