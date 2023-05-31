# Pumpkin-Artwork-WebGL
This is a project that creates a pumpkin artwork using WebGL. It consists of two files: lab2.html and lab2Basis.js.

## html file in Pumpkin Directory
This file contains the vertex shader and fragment shader for the program. It also includes the necessary dependencies for the program to run: webgl-utils.js, initShaders.js, and MV.js.

## js file in Pumpkin Directory
This file contains the JavaScript code for the program. It initializes the WebGL context, sets up the shaders, and draws the pumpkin artwork.

The pumpkin is created using multiple shapes: triangles, squares, and octagons. The vertices for these shapes are defined in an array called vertices. The program then sets up the buffers for these vertices and passes them to the shaders. The shaders use the transform, modelView, and projection matrices to position the shapes in 3D space and the fColor uniform variable to set the color of the shapes.

## Usage
Open lab2Basis.html in a browser that supports WebGL.
The pumpkin artwork should be displayed in the canvas element on the page.
Dependencies
These are included in the common directory. It is important for the common directory to be in the directory before the pumpkin directory.
webgl-utils.js
initShaders.js
MV.js
