
/**
 * @author speigg adapted for use with Wide5 HMD (originally CrosseyedEffect.js)
 * @author alteredq / http://alteredqualia.com/ 
 */
 
THREE.Wide5Renderer = function ( renderer ) {

    // API

    this.narrowFOV = 80;           
    this.wideFOV = 140;       
          
    this.lookSideNarrow = 11.25; 
    this.lookSideWide = 11.25;  
    this.lookDownNarrow = 0;  // RIGHT!!! (not 10 like spec says)
    this.lookDownWide = 5;

    this.eyeSeparation = 6;
    
	// internals
    

	var _width, _height;

	var _cameraLNarrow = new THREE.PerspectiveCamera();
    _cameraLNarrow.target = new THREE.Vector3();

	var _cameraRNarrow = new THREE.PerspectiveCamera();
	_cameraRNarrow.target = new THREE.Vector3();
    
    var _cameraLWide = new THREE.PerspectiveCamera();
    _cameraLWide.target = new THREE.Vector3();

	var _cameraRWide = new THREE.PerspectiveCamera();
	_cameraRWide.target = new THREE.Vector3();

	// initialization

	renderer.autoClear = false;
    _width = 800;
    _height = 600;
	renderer.setSize( 1600, 1200 ); // Wide5 HMD expects this resolution
    
    this.setSize = function ( width, height ) {

    	_width = width / 2;
		_height = height / 2;

		renderer.setSize( width, height );

	};
        
	this.render = function ( scene, camera ) {
        
        var aspect = _height/_width;

		// leftNarrow

    	_cameraLNarrow.fov = this.narrowFOV;
		_cameraLNarrow.aspect = aspect;
		_cameraLNarrow.near = camera.near;
		_cameraLNarrow.far = camera.far;
		_cameraLNarrow.updateProjectionMatrix();

		_cameraLNarrow.position.copy( camera.position );
		_cameraLNarrow.translateX( -this.eyeSeparation );
        _cameraLWide.eulerOrder = 'YXZ';
        _cameraLNarrow.rotation.y = this.lookSideNarrow * Math.PI / 180;
        _cameraLNarrow.rotation.x = this.lookDownNarrow * Math.PI / 180;

		// rightNarrow

		_cameraRNarrow.near = camera.near;
		_cameraRNarrow.far = camera.far;
		_cameraRNarrow.projectionMatrix = _cameraLNarrow.projectionMatrix;

		_cameraRNarrow.position.copy( camera.position );
		_cameraRNarrow.translateX( this.eyeSeparation);
        _cameraRWide.eulerOrder = 'YXZ';
        _cameraRNarrow.rotation.y = -this.lookSideNarrow * Math.PI / 180;
        _cameraRNarrow.rotation.x = this.lookDownNarrow * Math.PI / 180;
        
        // leftWide

    	_cameraLWide.fov = this.wideFOV;
		_cameraLWide.aspect = aspect;
		_cameraLWide.near = camera.near;
		_cameraLWide.far = camera.far;
		_cameraLWide.updateProjectionMatrix();

		_cameraLWide.position.copy( camera.position );
		_cameraLWide.translateX( -this.eyeSeparation );
        _cameraLWide.eulerOrder = 'YXZ';
        _cameraLWide.rotation.y = this.lookSideWide * Math.PI / 180;
        _cameraLWide.rotation.x = this.lookDownWide * Math.PI / 180;

		// rightWide

		_cameraRWide.near = camera.near;
		_cameraRWide.far = camera.far;
		_cameraRWide.projectionMatrix = _cameraLWide.projectionMatrix;

		_cameraRWide.position.copy( camera.position );
		_cameraRWide.translateX( this.eyeSeparation);
        _cameraLWide.eulerOrder = 'YXZ';
        _cameraRWide.rotation.y = -this.lookSideWide * Math.PI / 180;
        _cameraRWide.rotation.x = this.lookDownWide * Math.PI / 180;

		renderer.clear();

		renderer.setViewport( 0, _height, _width, _height );
		renderer.render( scene, _cameraLNarrow );

		renderer.setViewport( _width, _height, _width, _height );
		renderer.render( scene, _cameraRNarrow );
        
        renderer.setViewport( 0, 0, _width, _height );
		renderer.render( scene, _cameraLWide );

		renderer.setViewport( _width, 0, _width, _height );
		renderer.render( scene, _cameraRWide );

	};

};