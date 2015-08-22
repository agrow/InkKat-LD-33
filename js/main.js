
/*
 * Global namespace variable holding important singletons of the tool.
 * Gives seperate components a means of passing/accessing important information.
 */
var global={};

// Document is ready for presentation. Let's present!
window.onload = function(e){ 
    init();
};

var init = function(){
	global.model = new Model();
	global.view = new View();
	global.controller = new Controller();
	
	global.model.initGameViewElements();
};
