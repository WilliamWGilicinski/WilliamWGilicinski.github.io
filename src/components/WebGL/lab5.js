var gl;
var shaderProgram;
var skyboxShaderProgram;
var objects = [];

// ************** Init OpenGL Context etc. ************* 

var objectsSpinning = false;
var cameraSpinning = false;

var translation = [-75, 0, -100];
var rotation = [degToRad(0), degToRad(0), degToRad(0)];
var cameraRotation = [degToRad(0), degToRad(0), degToRad(0)];
var scale = [1, 1, 1];
var fieldOfView = 90;
var cameraPosition = [0, 0, 0];

var light;
// set up the parameters for lighting 
var light_ambient = [0,0,0,1]; 
var light_diffuse = [.8,.8,.8,1];
var light_specular = [1,1,1,1]; 
var light_pos = [-20,0,0,1];   // eye space position 

var mat_ambient = [0, 0, 0, 1]; 
var mat_diffuse= [1, 1, 0, 1]; 
var mat_specular = [.9, .9, .9,1]; 
var mat_shine = 50;
var mat_reflectivity = [.3, .3, .3, 1]; 

var cubeMapTexture;

var cameraMatrix = mat4.create();
var mMatrix = mat4.create();  // model matrix
var vMatrix = mat4.create(); // view matrix
var pMatrix = mat4.create();  //projection matrix
var nMatrix = mat4.create();  // normal matrix
var viewDirectionProjectionInverseMatrix = mat4.create();
var viewDirectionProjectionMatrix = mat4.create();
var superMat = mat4.create();
var Z_angle = 0.0;

function radToDeg(r) {
    return r * 180 / Math.PI;
}

function degToRad(d) {
    return d * Math.PI / 180;
}

function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

function webGLStart() {
    var canvas = document.getElementById("canvas");
    initGL(canvas);
    initShaders();
    addListeners();
    clear();

    cubeMapTexture = createCubeMap();
    createObjects();
    createJSONObj();

    gl.clearColor(.8, .8, .8, 1.0);
    requestAnimationFrame(drawScene);
}

function pushObject(name, geoBuffer, colorBuffer, normalBuffer,
     UVBuffer, numFaces, scale, translation, texture, material){

    var index = objects.length;
    var space = 50;
    translation[0] += index * space;

  objects.push({
    name: name,
    geoBuffer: geoBuffer,
    colorBuffer: colorBuffer,
    normalBuffer: normalBuffer,
    UVBuffer: UVBuffer,
    numFaces: numFaces,
    localScale: scale,
    localTranslation: translation,
    texture: texture,
    material: material
  });

  if(name === "lightbulb"){
    light = objects.pop();
    objects.push(light);
    light.localTranslation = light_pos;
  }
}

function setFloat32Buffer(gl, geoBuffer, geoData){

  gl.bindBuffer(gl.ARRAY_BUFFER, geoBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(geoData),
        gl.STATIC_DRAW
    );
}

function setColorBuffer(gl, colorBuffer, colorData){

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Uint8Array(colorData),
        gl.STATIC_DRAW
    );

}

function createTexture(path){
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255]));
    // Asynchronously load an image
    var image = new Image();
    //image.src = "./mip-low-res-enlarged.png";
    image.src = path;
    image.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
    });

    return texture
}

var jsonObjects = ["gameboy", "building", "lightbulb"]

async function createJSONObj() {
    //Goes through each JSON file
    jsonObjects.forEach(file => {
        objData.createData(false, file).then(JSONData => {

            //Creates a seperate buffer for each geometry
            //Will doesn't work great with mutiple geos but will fix!
            JSONData.geometries.forEach(geometry => {
                geoBuffer = gl.createBuffer();
                setFloat32Buffer(gl, geoBuffer, geometry.data.attributes.position.array);
    
                var numFaces = geometry.data.attributes.position.array.length / 6;
    
                colorBuffer = gl.createBuffer();
                colorData = generateColorData(true, numFaces, [255, 255, 255])
                setColorBuffer(gl, colorBuffer, colorData);
    
                normalBuffer = gl.createBuffer();
                setFloat32Buffer(gl, normalBuffer, geometry.data.attributes.normal.array);

                UVBuffer = gl.createBuffer();
                setFloat32Buffer(gl, UVBuffer, geometry.data.attributes.uv.array)
    
                texture = createTexture(JSONData.images[0].url);
                var material = createMaterial();

                pushObject(file, geoBuffer, colorBuffer, normalBuffer, UVBuffer, numFaces, objData.localScale, [0, 0, 0], texture, material);
    
                //drawScene();
            })
        })
    })
    
    
}

var createdLight = true;
var objectDatas = [cubeData, sphereData];

function createObjects() {

  objectDatas.forEach(objectData => {

    var objectName = objectData.name;

    //Creates the light in the scene
    if(!createdLight){

        //Need these to reset the data
        originalColor = objectData.color;

        objectData.color = [255, 255, 0];
        objectName = "light"
        objectData.createData(true);

        objectData.color = originalColor;
        createdLight = true;
    }
    else{
        objectData.createData(false);
    }
    
    
    geoBuffer = gl.createBuffer();
    setFloat32Buffer(gl, geoBuffer, objectData.geoData);

    colorBuffer = gl.createBuffer();
    setColorBuffer(gl, colorBuffer, objectData.colorData);

    normalBuffer = gl.createBuffer();
    setFloat32Buffer(gl, normalBuffer, objectData.normalData);

    UVBuffer = gl.createBuffer();
    setFloat32Buffer(gl, UVBuffer, objectData.UVData);

    var texture = createTexture("./mip-low-res-enlarged.png");
    var material = objectData.material;
    console.log(material);

    numFaces = objectData.numFaces;

    pushObject(objectName, geoBuffer, colorBuffer, normalBuffer, UVBuffer, numFaces, scale, [0, 0, 0], texture, material);
  });
}



//Mostly from webgl fundamentals: https://webglfundamentals.org/webgl/lessons/webgl-environment-maps.html
function createCubeMap() {

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    const facesInfo = [
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
            url: "./FishPond/posx.jpg"
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
            url: "./FishPond/negx.jpg"
        },
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
            url: "./FishPond/posy.jpg"
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            url: "./FishPond/negy.jpg"
        },
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
            url: "./FishPond/posz.jpg"
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
            url: "./FishPond/negz.jpg"
        },
    ];

    facesInfo.forEach(face => {
        const {target, url} = face;

              // Upload the canvas to the cubemap face.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 2048;
        const height = 2048;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;

        gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

        const image = new Image();
        image.src = url;
        image.addEventListener('load', function() {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
            gl.texImage2D(target, level, internalFormat, format, type, image);
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        });
    });
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    return texture;
}

var then = 0;

function drawScene(now){

    // Convert to seconds
    now *= 0.01;
    // Subtract the previous time from the current time
    var deltaTime = now - then;
    // Remember the current time for the next frame.
    then = now;

    if(objectsSpinning){
        var rotationSpeed = 0.2;

    
        // Every frame increase the rotation a little.
        rotation[1] += rotationSpeed * deltaTime;
        rotation[2] += rotationSpeed * deltaTime;

    }

    if(cameraSpinning){
        var rotationSpeed = 0.1;
        var currentAngle = rotationSpeed * now;
        var radius = 200;
        var target = [150, 0, -100];
        var up = [0, 1, 0];
        
        mat4.identity(cameraMatrix);
        cameraPosition = [Math.cos(currentAngle) * radius + target[0], 0, Math.sin(currentAngle) * radius + target[2]];
        cameraMatrix = mat4.lookAt(cameraPosition, target, up, cameraMatrix);
        cameraRotation[1] = currentAngle;

    }else{
        mat4.identity(cameraMatrix);
        cameraMatrix =  mat4.translate(cameraMatrix, cameraPosition);
        cameraMatrix = mat4.rotateX(cameraMatrix, cameraRotation[0]);
        cameraMatrix = mat4.rotateY(cameraMatrix,cameraRotation[1]);
        cameraMatrix = mat4.rotateZ(cameraMatrix, cameraRotation[2]);
    }


    // Compute the matrix
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var zNear = 1;
    var zFar = 2000;
    pMatrix = mat4.perspective(fieldOfView, aspect, zNear, zFar);  // set up the projection matrix 

    vMatrix = mat4.inverse(cameraMatrix);

       mat4.identity(viewDirectionProjectionInverseMatrix);
       mat4.identity(viewDirectionProjectionMatrix);

       var viewDirectionMatrix = mat4.copy(vMatrix);
   viewDirectionMatrix[12] = 0;
   viewDirectionMatrix[13] = 0;
   viewDirectionMatrix[14] = 0;

    viewDirectionProjectionMatrix = mat4.multiply(pMatrix, viewDirectionMatrix, viewDirectionProjectionMatrix);
    viewDirectionProjectionInverseMatrix = mat4.inverse(viewDirectionProjectionMatrix);
    
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Turn on culling. By default backfacing triaangles
    // will be culled.
    gl.enable(gl.CULL_FACE);

    // Enable the depth buffer
    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(shaderProgram);

    objects.forEach((object) => {

        setMatricies(object);
        setUniforms(object);
        bindBuffers(object);
        
        //Binds the texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, object.texture);
        
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeMapTexture);
          
        gl.depthFunc(gl.LESS);
        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = object.numFaces * 6;
        gl.drawArrays(primitiveType, offset, count);
    });

    drawSkybox();

    
    requestAnimationFrame(drawScene);
}

function bindBuffers(object){
    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, object.geoBuffer);   
    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute, size, type, normalize, stride, offset); 
    
      
    // Bind the normal buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);   
    // Tell the normal attribute how to get data out of normalBuffer (ARRAY_BUFFER)
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        shaderProgram.vertexNormalAttribute, size, type, normalize, stride, offset);    
      
    //Binds the color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);    
    // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
    var size = 3;                 // 3 components per iteration
    var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
    var normalize = true;         // normalize the data (convert from 0-255 to 0-1)
    var stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;               // start at the beginning of the buffer
    gl.vertexAttribPointer(
        shaderProgram.vertexColorAttribute, size, type, normalize, stride, offset);   

    
    //Binds the normal
    gl.bindBuffer(gl.ARRAY_BUFFER, object.UVBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
}

function setUniforms(object){

    gl.uniform4f(shaderProgram.light_posUniform,  light_pos[0], light_pos[1], light_pos[2], light_pos[3]); 	
    gl.uniform4fv(shaderProgram.ambient_coefUniform, object.material.ambient); 
    gl.uniform4fv(shaderProgram.diffuse_coefUniform, object.material.diffuse); 
    gl.uniform4fv(shaderProgram.specular_coefUniform, object.material.specular); 
    gl.uniform1f(shaderProgram.shininess_coefUniform, object.material.shine); 
    gl.uniform4fv(shaderProgram.reflectivity, object.material.reflectivity);
          
    gl.uniform4f(shaderProgram.light_ambientUniform, light_ambient[0], light_ambient[1], light_ambient[2], 1.0); 
    gl.uniform4f(shaderProgram.light_diffuseUniform, light_diffuse[0], light_diffuse[1], light_diffuse[2], 1.0); 
    gl.uniform4f(shaderProgram.light_specularUniform, light_specular[0], light_specular[1], light_specular[2],1.0);
    
    gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
    gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, nMatrix);	

    gl.uniform3fv(shaderProgram.worldCameraPosition, cameraPosition);
    gl.uniform1i(shaderProgram.textureUniform, 0);
    gl.uniform1i(shaderProgram.cubeMapTexture, 1);
}

function setMatricies(object){


     mat4.identity(mMatrix);
     //Checks to see if the object is the light
     if(object.name === "light"){
         object.localTranslation = light_pos;
         object.localScale = [.5,.5,.5];
     }else{
         mMatrix = mat4.translate(mMatrix, translation);
     }

     mMatrix = mat4.translate(mMatrix, object.localTranslation);
     mMatrix = mat4.rotateX(mMatrix, rotation[0])	// set up the view matrix, multiply into the modelview matrix
     mMatrix = mat4.rotateY(mMatrix, rotation[1])
     mMatrix = mat4.rotateZ(mMatrix, rotation[2])    // now set up the model matrix
     mMatrix = mat4.scale(mMatrix, scale);
     mMatrix = mat4.scale(mMatrix, object.localScale);
     
     mat4.identity(nMatrix);
     nMatrix = mat4.multiply(nMatrix, vMatrix);
     nMatrix = mat4.multiply(nMatrix, mMatrix); 	
     nMatrix = mat4.inverse(nMatrix);
     nMatrix = mat4.transpose(nMatrix); 

}

function drawSkybox(){
    var skyboxPositions = [
        -1, -1,
        1, -1,
        -1,  1, 
        -1,  1,
        1, -1,
        1,  1,
    ];

    var skyboxBuffer = gl.createBuffer();
    gl.depthFunc(gl.LEQUAL);

    gl.useProgram(skyboxShaderProgram);
    setFloat32Buffer(gl, skyboxBuffer, skyboxPositions);
    gl.bindBuffer(gl.ARRAY_BUFFER, skyboxBuffer);
    gl.vertexAttribPointer(skyboxShaderProgram.vertexAttribPointer, 2, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(skyboxShaderProgram.viewDirectionProjectionInverse, false, viewDirectionProjectionInverseMatrix);
    gl.uniform1i(skyboxShaderProgram.skyboxTexture, 0);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
}

//From learnWebGL
function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;

    if (needResize) {

        console.log("Resizing!");
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }

    return needResize;
  }

function animateCameraSpinning(){

    

}

var then = 0;
function animateObjectsSpinning(now){
    var rotationSpeed = 1.2;

    // Convert to seconds
    now *= 0.001;
    // Subtract the previous time from the current time
    var deltaTime = now - then;
    // Remember the current time for the next frame.
    then = now;

    // Every frame increase the rotation a little.
    rotation[1] += rotationSpeed * deltaTime;

    requestAnimationFrame(drawScene);
}

function addListeners(){

    var moveStep = 1;
    var rotStep = degToRad(5);
    var canvas = document.getElementById("canvas");

    canvas.addEventListener('keydown', (e) => {
        switch(e.key){
            case 'w':
                translation[2] -= moveStep;
                break;
            case 'a':
                translation[0] -= moveStep;
                break;
            case 's':
                translation[2] += moveStep;
                break;
            case 'd':
                translation[0] += moveStep;
                break;
            case '1':
                light_pos[0] -= moveStep;
                break;
            case '2':
                light_pos[2] += moveStep;
                break;
            case '3':
                light_pos[0] += moveStep;
                break;
            case '5':
                light_pos[2] -= moveStep;
                break;
            case '4':
                light_pos[1] -= moveStep;
                break;
            case '6':
                light_pos[1] += moveStep;
                break;
            case 'P':
                cameraRotation[0] += rotStep;
                break;
            case 'p':
                cameraRotation[0] -= rotStep;
                break;
            case 'Y':
                cameraRotation[1] += rotStep;
                break;
            case 'y':
                cameraRotation[1] -= rotStep;
                break;    
            case 'R':
                cameraRotation[2] += rotStep;
                break;
            case 'r':
                cameraRotation[2] -= rotStep;
                break;
            case 'B':
                rotation[0] += rotStep;
                break;
            case 'b':
                rotation[0] -= rotStep;
                break;
            case 'N':
                rotation[1] += rotStep;
                break;
            case 'n':
                rotation[1] -= rotStep;
                break;    
            case 'M':
                rotation[2] += rotStep;
                break;
            case 'm':
                rotation[2] -= rotStep;
                break;    
            case 'z':
                cameraSpinning = !cameraSpinning;
                break;
            case 'x':
                objectsSpinning = !objectsSpinning;
                break;
            case 'v':
                cameraPosition[0] += moveStep;
                break;
            case 'V':
                cameraPosition[0] -= moveStep;
                break;
            case 'c':
                cameraPosition[1] += moveStep;
                break;
            case 'C':
                cameraPosition[1] -= moveStep;
                break;
            case 'f':
                cameraPosition[2] += moveStep;
                break;
            case 'F':
                cameraPosition[2] -= moveStep;
                break;
        }
        requestAnimationFrame(drawScene);

    });
}

function clear(){

}