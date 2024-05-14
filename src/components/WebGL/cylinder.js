var baseRadius = 15;
var topRadius = 15;
var height = 5;
var numberOfSlices = 30;
var numberOfStacks = 10;
var color = [84, 35, 68];

function createSlice (radius, midPoint){

    var circleBuffer = [];
    var stepSize = (2 * Math.PI) / numberOfSlices;

    for(var i = 0.0; i < 2 * Math.PI; i += stepSize){
        circleBuffer.push(
        
            //Top of the slice
            midPoint[0], midPoint[1], midPoint[2],
            midPoint[0] + Math.cos(i) * radius, midPoint[1], midPoint[2] + Math.sin(i) * radius,
            midPoint[0] + Math.cos(i + stepSize) * radius, midPoint[1], midPoint[2] + Math.sin(i + stepSize) * radius,

            //Side of the slice
            midPoint[0] + Math.cos(i) * radius, midPoint[1], midPoint[2] + Math.sin(i) * radius,
            midPoint[0] + Math.cos(i) * radius, midPoint[1] + height, midPoint[2] + Math.sin(i) * radius,
            midPoint[0] + Math.cos(i + stepSize) * radius, midPoint[1], midPoint[2] + Math.sin(i + stepSize) * radius,

            midPoint[0] + Math.cos(i) * radius, midPoint[1] + height, midPoint[2] + Math.sin(i) * radius,
            midPoint[0] + Math.cos(i + stepSize) * radius, midPoint[1] + height, midPoint[2] + Math.sin(i + stepSize) * radius,
            midPoint[0] + Math.cos(i + stepSize) * radius, midPoint[1], midPoint[2] + Math.sin(i + stepSize) * radius,
            //Bottom of the Slice
            midPoint[0], midPoint[1] + height, midPoint[2],
            midPoint[0] + Math.cos(i + stepSize) * radius, midPoint[1] + height, midPoint[2] + Math.sin(i + stepSize) * radius,
            midPoint[0] + Math.cos(i) * radius, midPoint[1] + height, midPoint[2] + Math.sin(i) * radius,
        );
        cylinderData.numFaces += 2;   
    }

    return circleBuffer;

}

function createCylinder(){

    for(var i = 0.0; i < numberOfStacks; i++){

        var differenceRadius = (topRadius - baseRadius);
        cylinderData.geoData = cylinderData.geoData.concat(createSlice(baseRadius - (i * (differenceRadius / (numberOfStacks * 1.0))), [0, 0 + i * height, 0]));

    }

}

var cylinderData = {


    createData: function(sameColor) {

        createCylinder();
        this.colorData = generateColorData(sameColor, this.numFaces, this.geoData);
        this.normalData = generateNormalData(this.geoData);
    },

    "geoData": [],

    "colorData": [],

    "normalData": [],

    "numFaces" : 0

}