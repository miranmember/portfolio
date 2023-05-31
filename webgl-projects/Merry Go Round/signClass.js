class signClass{
	constructor(gl, program) {
        this.gl = gl;           // WebGL graphics environment
        this.program = program; // The shader program       	
		this.points = [ ];	// Vertex location data
		this.colors = [ ];	// Vertex color data
		this.texCoords = [ ];	// Vertex texture coordinate data
		this.points.push( vec3( -5, 2, -6 ) );	// Lower right
		this.colors.push( vec3( 1, 1, 1 ) );
		this.texCoords.push( vec2( 0, 0 ) );
		
		this.points.push( vec3( 5, 2, -6 ) );		// Lower left
		this.colors.push( vec3( 1, 1, 1 ) );
		this.texCoords.push( vec2( 0, 1 ) );
		
		this.points.push( vec3( -5, -2, -6 ) );		// Upper right
		this.colors.push( vec3( 1, 1, 1 ) );
		this.texCoords.push( vec2( 1,0  ) );
		
		this.points.push( vec3( 5, -2, -6 ) );		// Upper left
		this.colors.push( vec3( 1, 1, 1 ) );
		this.texCoords.push( vec2(1, 1 ) );
		
		var nPoints = 4;
		this.vbufferID1 = gl.createBuffer( );
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vbufferID1 );
		gl.bufferData( gl.ARRAY_BUFFER, flatten( this.points ), gl.STATIC_DRAW );
		
		this.cbufferID1 = gl.createBuffer( );
		gl.bindBuffer( gl.ARRAY_BUFFER, this.cbufferID1 );
		gl.bufferData( gl.ARRAY_BUFFER, flatten( this.colors ), gl.STATIC_DRAW );
		
		this.tbufferID1 = gl.createBuffer( );
		gl.bindBuffer( gl.ARRAY_BUFFER, this.tbufferID1 );
		gl.bufferData( gl.ARRAY_BUFFER, flatten( this.texCoords ), gl.STATIC_DRAW );
		
		gl.bindBuffer( gl.ARRAY_BUFFER, null );

		gl.enable( gl.DEPTH_TEST );	
		
		// Initialization is done.  Now initiate first rendering
		return;
	}
	
	render() {
        var gl = this.gl;   // Since we are seperated with classes
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vbufferID1 );
		var vPosition = gl.getAttribLocation( program, "vPosition" );
		gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPosition );
		
		gl.bindBuffer( gl.ARRAY_BUFFER, this.cbufferID1 );
		var vColor = gl.getAttribLocation( program, "vColor" );
		gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vColor );
		
		gl.bindBuffer( gl.ARRAY_BUFFER, this.tbufferID1 );
		var vTexCoords = gl.getAttribLocation( program, "vTexCoords" );
		gl.vertexAttribPointer( vTexCoords, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vTexCoords );
		
		var texData = fillArray( );
		
		var texture = gl.createTexture( );
		gl.activeTexture( gl.TEXTURE0 );
		gl.bindTexture( gl.TEXTURE_2D, texture );
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 32, 32, 0, gl.RGBA, gl.UNSIGNED_BYTE, texData );
		gl.uniform1i( gl.getUniformLocation( program, "uTextureMap" ), 0 ); // Associate "uTextureMap" with TEXTURE0
		
		gl.generateMipmap( gl.TEXTURE_2D );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
        
		gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
        	
        
        return;
	} 
}

function fillArray( ) {

	// This function returns a 32 x 32 RGBA texture image.
	
	var result = new Uint8Array( 32 * 32 * 4 );
	
	// The remainder of this function is intentionally obscure.
	// Please do not try to figure out what it does ( until you have seen the result. )
	
	for( r = 0; r < 32; r++ )
		for( c = 0; c < 32; c++ ) {
			result[ r * 128 + c * 4 ] = 255;
			result[ r * 128 + c * 4 + 1 ] = 0;
			result[ r * 128 + c * 4 + 2 ] = 0;
			result[ r * 128 + c * 4 + 3 ] = 255;
		}
		
	for( r = 2; r < 13; r++ )
		for( c = 0; c < 9; c++ ) {
			result[ r * 128 + c * 4 + 13 ] = 255;
			result[ r * 128 + c * 4 + 14 ] = 255;
			result[ r * 128 + c * 4 + 81 ] = 255;
			result[ r * 128 + c * 4 + 82 ] = 255;
			if( c > 3 ) continue;
			result[ r * 128 + c * 4 + 57 ] = 255;
			result[ r * 128 + c * 4 + 58 ] = 255;
		}
		
	for( r = 0; r < 9; r++ )
		for( c = 0; c < 2; c++ ) {
			result[ r * 128 + c * 4 + 400 ] = 0;
			result[ r * 128 + c * 4 + 401 ] = 0;
			result[ r * 128 + c * 4 + 402 ] = 255;
			result[ r * 128 + c * 4 + 420 ] = 0;
			result[ r * 128 + c * 4 + 421 ] = 0;
			result[ r * 128 + c * 4 + 422 ] = 255;
			result[ r * 128 + c * 4 + 444 ] = 0;
			result[ r * 128 + c * 4 + 445 ] = 0;
			result[ r * 128 + c * 4 + 446 ] = 255;
			result[ r * 128 + c * 4 + 468 ] = 0;
			result[ r * 128 + c * 4 + 469 ] = 0;
			result[ r * 128 + c * 4 + 470 ] = 255;
			if( r < 3 || r > 5 ) {
				result[ r * 128 + c * 4 + 488 ] = 0;
				result[ r * 128 + c * 4 + 489 ] = 0;
				result[ r * 128 + c * 4 + 490 ] = 255;
			}
			if( r > 6 ) continue;
			result[ c * 128 + r * 4 + 400 ] = 0;
			result[ c * 128 + r * 4 + 401 ] = 0;
			result[ c * 128 + r * 4 + 402 ] = 255;
			result[ c * 128 + r * 4 + 468 ] = 0;
			result[ c * 128 + r * 4 + 469 ] = 0;
			result[ c * 128 + r * 4 + 470 ] = 255;
			result[ c * 128 + r * 4 + 1364 ] = 0;
			result[ c * 128 + r * 4 + 1365 ] = 0;
			result[ c * 128 + r * 4 + 1366 ] = 255;
		}
		for( r = 0; r < 16; r++ )
			for( c = 0; c < 32; c++ ) {
				result[ r * 128 + c * 4  + 2048 ] = 255 - result[ r * 128 + c * 4 ];
				result[ r * 128 + c * 4  + 2049 ] = 255 - result[ r * 128 + c * 4 + 1 ];
				result[ r * 128 + c * 4  + 2050 ] = 255 - result[ r * 128 + c * 4 + 2 ];
			}
	return result;
}