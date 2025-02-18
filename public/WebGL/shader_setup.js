
function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}


function initShaders() {

    shaderProgram = gl.createProgram();
    skyboxShaderProgram = gl.createProgram();

    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");
    var skyboxShaderVertex = getShader(gl, "skybox-shader-vs");
    var skyboxShaderFragment = getShader(gl, "skybox-shader-fs");

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.attachShader(skyboxShaderProgram, skyboxShaderVertex);
    gl.attachShader(skyboxShaderProgram, skyboxShaderFragment);

    gl.linkProgram(shaderProgram);
    gl.linkProgram(skyboxShaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
    if (!gl.getProgramParameter(skyboxShaderProgram, gl.LINK_STATUS)){
        alert("Could not initialize skybox shader");
    }
    
    gl.useProgram(skyboxShaderProgram);

    skyboxShaderProgram.vertexPositionAttribute = gl.getAttribLocation(skyboxShaderProgram, "a_position");
    skyboxShaderProgram.skyboxTexture = gl.getUniformLocation(skyboxShaderProgram, "u_skybox");
    skyboxShaderProgram.viewDirectionProjectionInverse = gl.getUniformLocation(skyboxShaderProgram, "u_viewDirectionProjectionInverse");

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "a_position");
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "a_color");
    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "a_normal");
    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "a_texcoord");

    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    
    shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
    shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
    
    shaderProgram.cubeMapTexture = gl.getUniformLocation(shaderProgram, "u_cubeTexture");
    shaderProgram.worldCameraPosition = gl.getUniformLocation(shaderProgram, "u_worldCameraPosition");

    shaderProgram.light_posUniform = gl.getUniformLocation(shaderProgram, "light_pos");
    shaderProgram.ambient_coefUniform = gl.getUniformLocation(shaderProgram, "ambient_coef");	
    shaderProgram.diffuse_coefUniform = gl.getUniformLocation(shaderProgram, "diffuse_coef");
    shaderProgram.specular_coefUniform = gl.getUniformLocation(shaderProgram, "specular_coef");
    shaderProgram.shininess_coefUniform = gl.getUniformLocation(shaderProgram, "mat_shininess");
    shaderProgram.reflectivity = gl.getUniformLocation(shaderProgram, "reflectivity");
    shaderProgram.light_ambientUniform = gl.getUniformLocation(shaderProgram, "light_ambient");	
    shaderProgram.light_diffuseUniform = gl.getUniformLocation(shaderProgram, "light_diffuse");
    shaderProgram.light_specularUniform = gl.getUniformLocation(shaderProgram, "light_specular");	

    shaderProgram.texureUniform = gl.getUniformLocation(shaderProgram, "u_texture");


}

