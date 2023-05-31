/* 
	Author: Miran Member
	NetId = mmembe2
*/
var gl;				// WebGL graphics environment
var program;		// The shader program
var aspectRatio;	// Aspect ratio of viewport

var vbufferID_axes;		// ID of buffer holding axes positions
var cbufferID_axes;	

var time = 0;

var Base;
var thesign;
var Top2;
var Top;
var Side;
var Side1;
var Side2;
var Side3;
var nConeSectors = 15;
var AtX = 0;
var AtY = 0;
var CameraXY = [4,0.5,5];
var LookAtXY = [AtX, 0.5, AtY ];
var exit = false;

window.onload = function init( ) {
	document.addEventListener("keydown", Camera, false);
	var axesPoints = [ ];	// Vertex location data for axes
	var axesColors = [ ];
	var canvas = document.getElementById( "gl-canvas" );
	gl=WebGLUtils.setupWebGL( canvas );
	if( !gl ) {
		alert( "No WebGL" );
	}
	
	gl.viewport( 0, 0, canvas.width, canvas.height );
	aspectRatio = canvas.width / canvas.height ;
	gl.clearColor( 1.0, 1.0, 0.5, 1.0 );
	
	program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	axesPoints.push( vec3( 0, -2, 0 ) );
	axesColors.push( [Math.random(), Math.random(), Math.random()] );
	
	axesPoints.push( vec3( 0, 2, 0 ) );
	axesColors.push( [Math.random(), Math.random(), Math.random()] );
	
	Base = createCone( nConeSectors, gl, 0 );
	Top = createCone( nConeSectors, gl, 0 );
	Top2 = createCone( nConeSectors, gl, 0 );
	side = createCone( nConeSectors, gl, 0 );
	side1 = createCone( nConeSectors, gl, 0 );
	side2 = createCone( nConeSectors, gl, 0 );
	side3 = createCone( nConeSectors, gl, 0 );
	vbufferID_axes = gl.createBuffer( );
	gl.bindBuffer( gl.ARRAY_BUFFER, vbufferID_axes );
	gl.bufferData( gl.ARRAY_BUFFER, flatten( axesPoints ), gl.STATIC_DRAW );
	
	cbufferID_axes = gl.createBuffer( );
	gl.bindBuffer( gl.ARRAY_BUFFER, cbufferID_axes );
	gl.bufferData( gl.ARRAY_BUFFER, flatten( axesColors ), gl.STATIC_DRAW );
	
	thesign = new signClass(gl, program);
	gl.bindBuffer( gl.ARRAY_BUFFER, null );
	gl.enable( gl.DEPTH_TEST );
	render( );
}

function render( ) {
	if (exit) {return}
	time += 0.2;
	var Animation = mult(translate(0,0,0), rotateY(time));
	
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	
	var modelView = lookAt( CameraXY, LookAtXY, vec3( 0, 1, 0 ) );
	var vModelView = gl.getUniformLocation( program, "vModelView" );
	gl.uniformMatrix4fv( vModelView, false, flatten( modelView ) );
	
	var projection = perspective( 60, aspectRatio, 0.1, 10.0 );
	var vProjection = gl.getUniformLocation( program, "vProjection" );
	gl.uniformMatrix4fv( vProjection, false, flatten( projection ) );
	
	var transformation = scalem( 0.5,0.75,0.5);
	var vTransformation = gl.getUniformLocation(program, "vTransformation");
	gl.uniformMatrix4fv( vTransformation, false, flatten(transformation) );
	
	gl.bindBuffer( gl.ARRAY_BUFFER, vbufferID_axes );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	// Then the axes colors
	gl.bindBuffer( gl.ARRAY_BUFFER, cbufferID_axes );
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	
	gl.drawArrays( gl.LINES, 0, 2 );
	thesign.render();
	transformation = mult( translate(0,-1.5,0 ), scalem(3,0,3) );
	gl.uniformMatrix4fv( vTransformation, false, flatten(transformation) );
	renderCone( Base, nConeSectors, gl, program );
	
	transformation = mult( translate(0,1.5,0 ), scalem(3,1,3) );
	gl.uniformMatrix4fv( vTransformation, false, flatten(transformation) );
	renderCone( Top, nConeSectors, gl, program );
	transformation = mult( translate(0,1.5,0 ), scalem(3,0,3) );
	gl.uniformMatrix4fv( vTransformation, false, flatten(transformation) );
	renderCone( Top2, nConeSectors, gl, program );
	
	transformation = mult( translate(2.5,0,0), scalem(0.4,0.6,0.4) );
	transformation = mult(rotate(90, [-1,0,0]), transformation)
	transformation = mult(translate(0, Math.sin(0.03 * (time + 0 * 90)), 0), transformation);
	transformation = mult(Animation, transformation)
	gl.uniformMatrix4fv( vTransformation, false, flatten(transformation) );
	renderCone( side, nConeSectors, gl, program );
	
	transformation = mult( translate(0,0,2.5), scalem(0.4,0.6,0.4) );
	transformation = mult(rotate(90, [0,0,-1]), transformation)
	transformation = mult(translate(0, Math.sin(0.03 * (time + 1 * 90)), 0), transformation);
	transformation = mult(Animation, transformation)
	gl.uniformMatrix4fv( vTransformation, false, flatten(transformation) );
	renderCone( side1, nConeSectors, gl, program );
	
	transformation = mult( translate(0,0,-2.5), scalem(0.4,0.6,0.4) );
	transformation = mult(rotate(90, [0,0,1]), transformation)
	transformation = mult(translate(0, Math.sin(0.03 * (time + 2 * 90)), 0), transformation);
	transformation = mult(Animation, transformation)
	gl.uniformMatrix4fv( vTransformation, false, flatten(transformation) );
	renderCone( side2, nConeSectors, gl, program );
	
	transformation = mult( translate(-2.5,0,0), scalem(0.4,0.6,0.4) );
	transformation = mult(rotate(90, [1,0,0]), transformation)
	transformation = mult(translate(0, Math.sin(0.03 * (time + 3 * 90)), 0), transformation);
	transformation = mult(Animation, transformation)
	gl.uniformMatrix4fv( vTransformation, false, flatten(transformation) );
	renderCone( side3, nConeSectors, gl, program );
	requestAnimFrame( render );	
}

function Camera(event) {
	
	switch(event.keyCode){
		case 87:
			CameraXY = subtract(CameraXY, mult(vec3(0.1, 0, 0.1), CameraXY));
			
		break;
		case 83:
			CameraXY = add(CameraXY, mult(vec3(0.1, 0, 0.1), CameraXY));
		break;
		case 65:
			LookAtXY = [AtX,0.5,AtY++];

		break;
		case 68:
			LookAtXY = [AtX,0.5,AtY--];
		break;
		case 81:
			alert("Program Exited. Refresh to restart!");
			exit = true;
		break;
		case 82:
			AtX = 0;
			AtY = 0;
			CameraXY = [5,0.5,5];
			LookAtXY = [AtX, 0.5, AtY ];
			break;
		default:
			alert("W,  A,  S,  D  to  move  forwards,  rotate  left,  move  backwards,  and  rotate  right  respectively. ");
		
	}

}