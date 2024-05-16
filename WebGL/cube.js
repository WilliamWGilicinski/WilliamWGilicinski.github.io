var size = 30;

var cubeData = {

    "geoData":[

        //Back cube
        0,   0,  0,
        0, size,  0,
        size,   0,  0,
        0, size,  0,
        size, size,  0,
        size,   0,  0,

        //Bottom Cube
        0, 0, 0,
        size, 0, size,
        0, 0, size,
        0, 0, 0,
        size, 0, 0,
        size, 0, size,

        0,   size,   0,
        0,   size,  size,
        size,  size,  size,
        0,   size,   0,
        size,  size,  size,
        size,  size,   0,
        
        0, 0, 0,
        0, 0, size,
        0, size, size,
        0, 0, 0,
        0, size, size,
        0, size, 0,

        size, 0, 0,
        size, size, 0,
        size, 0, size,
        size, size, 0,
        size, size, size,
        size, 0, size,

        //Front
        0, 0, size,
        size, 0, size,
        size, size, size,
        0, 0, size,
        size, size, size,
        0, size, size,
        

    ],

    "UVData": [
        0, 0,
        0, 1,
        1, 0,
        0, 1,
        1, 1,
        1, 0,

        // bottom
        0, 0,
        1, 1,
        0, 1,
        0, 0,
        1, 0,
        1, 1,

        
        0, 0,
        1, 0,
        1, 1,
        0, 0,
        1, 1,
        0, 1,

        
        0, 0,
        1, 0,
        1, 1,
        0, 0,
        1, 1,
        0, 1,
        0, 0,
        0, 1,
        1, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        1, 0,
        1, 1,
        0, 0,
        1, 1,
        0, 1,
    ],

    "normalData": [],

    "colorData": [],

    "color": [216, 191, 170],

    "numFaces": 6,

    "name": "Cube",

    "material": {},

    createData: function(sameColor){
        this.colorData = generateColorData(sameColor, this.numFaces, this.color);
        this.normalData = generateNormalData(this.geoData);
        this.material = createMaterial();
    },
    
}
