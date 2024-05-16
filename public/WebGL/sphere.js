//From https://www.songho.ca/opengl/gl_sphere.html
function createVerticies (sphereRadius){

    var numberOfSphereSlices = sphereData.numberOfSlices;
    var numberOfSphereStacks = sphereData.numberOfStacks;
    var sphereRadius = sphereData.radius

    var sphereBuffer = [];
    
    var sliceStep = 2 * Math.PI / numberOfSphereSlices;
    var stackStep = 2 * Math.PI / numberOfSphereStacks;
    var sliceAngle, stackAngle;

    var x, y, z, xy;

    for(var i = 0; i <= numberOfSphereStacks; ++i){
        var stackCords = [];
        stackAngle = Math.PI / 2 - i * stackStep;
        xy = sphereRadius * Math.cos(stackAngle); //r * cos(u)
        z = sphereRadius * Math.sin(stackAngle); // r * sin(u)

        for(var j = 0; j <= numberOfSphereSlices; ++j){
            sliceAngle = j * sliceStep;

            x = xy * Math.cos(sliceAngle); // r * cos(u) * cos(v)
            y = xy * Math.sin(sliceAngle); // r * cos(u) * sin(v)

            var vertex = [x, y, z];
            sphereBuffer.push(vertex);
            
        }

    }

    return sphereBuffer;

}

function createSphereGeoData(){

    var numberOfSphereSlices = sphereData.numberOfSlices;
    var numberOfSphereStacks = sphereData.numberOfStacks;
    var sphereRadius = sphereData.radius

    var verticies = createVerticies(sphereRadius);
    var geoData = [];

    var k1, k2;
    var count = 0;

    for(var i = 0; i < numberOfSphereStacks; ++i){
        k1 = i * (numberOfSphereSlices + 1);
        k2 = k1 + numberOfSphereSlices + 1;

        for(var j = 0; j < numberOfSphereSlices; ++j, ++k1, ++k2){

            if(i != 0){
                count++
                var triangle = [
                    verticies[k1][0], verticies[k1][1], verticies[k1][2],
                    verticies[k2][0], verticies[k2][1], verticies[k2][2],
                    verticies[k1 + 1][0], verticies[k1 + 1][1], verticies[k1 + 1][2]
                ];
                geoData = geoData.concat(triangle);
            }

            if(i != (numberOfSphereStacks - 1)){
                count++;
                var triangle = [
                    verticies[k1 + 1][0], verticies[k1 + 1][1], verticies[k1 + 1][2],
                    verticies[k2][0], verticies[k2][1], verticies[k2][2],
                    verticies[k2 + 1][0], verticies[k2 + 1][1], verticies[k2 + 1][2]
                ];
                geoData = geoData.concat(triangle);
            }
        }
    }

    sphereData.numFaces = count / 2;

    return geoData;

}


var sphereData = {


    createData: function(sameColor) {
        this.geoData = createSphereGeoData();
        this.colorData = generateColorData(sameColor, this.numFaces, this.color);
        this.normalData = generateNormalData(this.geoData);
        this.material = createMaterial(mat_ambient, mat_diffuse, mat_specular, mat_shine,[1, 1, 1, 1]);
    },

    "geoData": [],

    "normalData": [],

    "colorData": [],

    "numFaces" : 0,

    "name": "Sphere",

    "material": {},

    "radius" : 30,
    "numberOfSlices": 20,
    "numberOfStacks" : 20,
    "color": [191, 209, 229]

}