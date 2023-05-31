
var gl;
var points;

var vPosition, vPosition2, vPosition3, vPosition4, vPosition5, vPosition6, vPosition7, vPosition8;
var bufferId, bufferId2, bufferId3, bufferId4, bufferId5, bufferId6, bufferId7, bufferId8;
var program;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
	var x1 = Math.random();
	var y1 = Math.random() * x1;
	var x2 = Math.random();
	var y2 = Math.random() * x2;
	var x3 = Math.random();
	var y3 = Math.random() * x3;
    var vertices = new Float32Array([x1, y1 , x2, y2, x3, y3]);
	var vertices2 = new Float32Array([y1, x1 , y2, x2, y3, x3]);
	var vertices3 = new Float32Array([-x1, y1 , -x2, y2, -x3, y3]);
	var vertices4 = new Float32Array([y1, -x1 , y2, -x2, y3, -x3]);
	var vertices5 = new Float32Array([x1, -y1 , x2, -y2, x3, -y3]);
	var vertices6 = new Float32Array([-y1, x1 , -y2, x2, -y3, x3]);
	var vertices7 = new Float32Array([-x1, -y1 , -x2, -y2, -x3, -y3]);
	var vertices8 = new Float32Array([-y1, -x1 , -y2, -x2, -y3, -x3]);
    //  Configure WebGL

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    bufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER,vertices2, gl.STATIC_DRAW );
	
    bufferId3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
    gl.bufferData( gl.ARRAY_BUFFER,vertices3, gl.STATIC_DRAW );   

	bufferId4 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId4 );
    gl.bufferData( gl.ARRAY_BUFFER,vertices4, gl.STATIC_DRAW );
	
	bufferId5 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId5 );
    gl.bufferData( gl.ARRAY_BUFFER,vertices5, gl.STATIC_DRAW );
	
	bufferId6 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId6 );
    gl.bufferData( gl.ARRAY_BUFFER,vertices6, gl.STATIC_DRAW );
	
	bufferId7 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId7 );
    gl.bufferData( gl.ARRAY_BUFFER,vertices7, gl.STATIC_DRAW );
	
	bufferId8 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId8 );
    gl.bufferData( gl.ARRAY_BUFFER,vertices8, gl.STATIC_DRAW );
	
    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
    
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );

	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
    vPosition3 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition3, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition3 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );

	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId4 );
    vPosition4 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition4, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition4 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );

	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId5 );
    vPosition5 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition5, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition5 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );

	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId6 );
    vPosition6 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition6, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition6 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );

	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId7 );
    vPosition7 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition7, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition7 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId8 );
    vPosition8 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition8, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition8 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );	
	
}
