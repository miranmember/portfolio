// lab2Basis.js
// Written September 2021 by . . . 


var gl;
var program;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // The following array contains coordinates for 15 vertices:
	//		The first three [ 0 to 2 ] will be used to draw triangles
	//		The next four [ 3 to 6 ] will be used to draw a square
	//		The final eight [ 7 to 14 ] will be  used to draw an octogon
    var vertices = [ vec3( -0.5, 0.0, 0.0 ), vec3( 0.5, 0.0,  0.0 ), vec3( 0.0, 1.0, 0.0 ), // First 3 = a triangle
		vec3( -0.5, 0.5, 0.0 ), vec3( -0.5, -0.5, 0.0 ), vec3( 0.5, 0.5, 0.0 ), vec3( 0.5, -0.5, 0.0 ), // Next 4
		vec3( -0.383, -0.924, -0.1 ), vec3( 0.383, -0.924, -0.1 ), vec3( 0.924, -0.383, -0.1 ), vec3( 0.924, 0.383, -0.1 ),
		vec3( 0.383, 0.924, -0.1 ), vec3( -0.383, 0.924, -0.1 ), vec3( -0.924, 0.383, -0.1 ), vec3( -0.924, -0.383, -0.1 ) ]

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
	gl.enable( gl.DEPTH_BUFFER_BIT );

    
    //  Load shaders and initialize attribute buffers
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the vertex position data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten( vertices ), gl.STATIC_DRAW );

    // Associate the shader variables with the data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
	
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	
	// Get all shader variable locations once.  This will not need to be repeated
	var transformLoc = gl.getUniformLocation( program, "transform" );
	var modelViewLoc = gl.getUniformLocation( program, "modelView" );
	var projectionLoc = gl.getUniformLocation( program, "projection" );
	var fColorLoc = gl.getUniformLocation( program, "fColor" );
	
	// Push the identity matrix to the transform variables for now.  Overwrite later as needed
	var identity = mat4( );
	gl.uniformMatrix4fv( transformLoc, false, flatten( identity ) );
	gl.uniformMatrix4fv( modelViewLoc, false, flatten( identity ) );
	gl.uniformMatrix4fv( projectionLoc, false, flatten( identity ) );
	
	// TODO 1:  One by one uncomment the following 3 lines and observe results
	// When done, comment them back out again.  ( But copy below as needed. )
    //gl.drawArrays( gl.TRIANGLES, 0, 3 ); 		// 3 points starting at index 0
	//gl.drawArrays( gl.TRIANGLE_STRIP, 3, 4 ); // 4 points starting at index 3
	//gl.drawArrays( gl.TRIANGLE_FAN, 7, 8 );	// 8 points starting at index 7
	
	// TODO 2:  Set the uniform fColor to orange and draw an octogon.  ( Adjust fragment shader )
	var color = vec4( 1, 0.5, 0, 1 );
	gl.uniform4fv( fColorLoc, color );
	
	var ctm = scalem( 0.9,0.9,0.0 );
	gl.uniformMatrix4fv( transformLoc, false, flatten( ctm ) );
	// ( This is line "A"   See below for step 3. )
	
	// Copy command from above to draw an octogon here.
	gl.drawArrays( gl.TRIANGLE_FAN, 7, 8 );
	// TODO 3:  Replace line "A" above with code to create a transformation matrix to scale by 0.9 in X and Y
	// and push it to the "transform" variable in the vertex shader.  Modify shader to use the variable.
	
	
		
	// TODO 4:  Draw a yellow triangle, scaled by a factor of 0.25 in the X and Y directions.
	// This will require pushing to the fColor and transform uniform variables
	
	color = vec4( 1, 1, 0.3, 1 );
	gl.uniform4fv( fColorLoc, color );

	// Put scaling commands here.  ( Push new ctm matrix to the "tranform" uniform variable
	ctm = scalem( 0.25,0.25,0.0 );
	gl.uniformMatrix4fv( transformLoc, false, flatten( ctm ) );
	// Put command here to draw a triangle
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	// TODO 5: Draw a yellow square, scaled by 0.25 in both directions, rotated 45 degrees, and translated by ( 0.3, 0.4, 0 )
	// In JavaScript, mult( A, B ) produces the product of matrices A * B.
	
	ctm = mult( translate( 0.3, 0.4, 0 ), mult( rotateZ( 45), scalem( 0.25, 0.25,0 ) ) );
	gl.uniformMatrix4fv( transformLoc, false, flatten(ctm) );

	// Command here to draw a square
	gl.drawArrays( gl.TRIANGLE_STRIP, 3, 4 );
	// TODO 6: Draw another yellow square as above, except translated by ( -0.3, 0.4, 0 )

	ctm = mult( translate( -0.3, 0.4, 0 ), mult( rotateZ( 45), scalem( 0.25, 0.25,0 ) ) );
	gl.uniformMatrix4fv( transformLoc, false, flatten(ctm) );
	// As in step 5
	gl.drawArrays( gl.TRIANGLE_STRIP, 3, 4 );
	// TODO 7:  Draw a yellow rectangle, scaling the square by 0.2 in the Y direction and 1.0 in X and Z
	// Translate it -0.2 in the Y direction
	
	ctm = mult( translate( 0, -0.3, 0 ), scalem( 1, 0.2,0.2 ) );
	gl.uniformMatrix4fv( transformLoc, false, flatten(ctm) );
	gl.drawArrays( gl.TRIANGLE_STRIP, 3, 4 );
	
	
	// TODO 8:  Draw a GREEN rectangle, scaled by 0.2 in X and 0.5 in Y, translated by 0.5 in Y
	color = vec4( 0, 1, 0, 1 );
	gl.uniform4fv( fColorLoc, color );
	ctm = mult( translate( 0, 1, 0 ), scalem( 0.2, 0.5,0 ) );
	gl.uniformMatrix4fv( transformLoc, false, flatten(ctm) );
	gl.drawArrays( gl.TRIANGLE_STRIP, 3, 4 );
	
	// TODO 9:  Draw two narrow yellow triangles, pointing down, just below and near the ends of the rectangle
	// drawn in step 7.  Hint:  "Pointing down" can be done with either rotation or scaling.
	color = vec4( 1, 1, 0.3, 1 );
	gl.uniform4fv( fColorLoc, color );
	ctm = mult( translate( -0.25, -0.25, 0 ), scalem( 0.2, -0.5,0 ) );
	gl.uniformMatrix4fv( transformLoc, false, flatten(ctm) );
	gl.drawArrays( gl.TRIANGLES, 0, 3 );

	ctm = mult( translate( 0.25, -0.25, 0 ), scalem( 0.2, -0.5,0 ) );
	gl.uniformMatrix4fv( transformLoc, false, flatten(ctm) );
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
}
