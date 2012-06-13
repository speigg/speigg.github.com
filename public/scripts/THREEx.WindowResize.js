/*
MIT Licensed from https://github.com/jeromeetienne/threex

Modified by Gheric Speiginer
- changed to use width and height from dom element rather than window
*/

/** @namespace */
var THREEx    = THREEx     	|| {};

/**
 * Update renderer and camera when the window is resized
 * 
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
*/
THREEx.WindowResize	= function(renderer, camera){
    
    var container = renderer.domElement.parentNode;
    
	var callback	= function(){
		// notify the renderer of the size change
		renderer.setSize( container.clientWidth, container.clientHeight );
		// update the camera
		if (camera.setSize) camera.setSize( container.clientWidth, container.clientHeight );
        else { 
            camera.aspect	= container.clientWidth / container.clientHeight;
            camera.left = -container.clientWidth / 2;
            camera.right = container.clientWidth / 2
        	camera.top = container.clientHeight / 2;
        	camera.bottom = -container.clientHeight / 2;
        }
		camera.updateProjectionMatrix();
    }
	// bind the resize event
	window.addEventListener('resize', callback, false);
	// return .stop() the function to stop watching window resize
	return {
		/**
		 * Stop watching window resize
		*/
		stop	: function(){
			window.removeEventListener('resize', callback);
		}
	};
}