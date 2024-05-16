function generateNormalData(geoData){

    var normalData = [];
    var p;
    var r;
    var q;
    var count = 0;
    var tempData = [];

    geoData.forEach(element => {
        
        tempData.push(element);
        count++;

        //Three verticies
        if(count == 9){

            for(var i = 0; i < 3; i++){

                //Gets all the data for a vertex
                var z = tempData.pop();
                var y = tempData.pop();
                var x = tempData.pop();

                switch(i){
                    case 0:
                        p = vec3.create([x, y, z]);
                        break;
                    case 1:
                        r = vec3.create([x, y, z]);
                        break;
                    case 2:
                        q = vec3.create([x, y, z]);
                        break;
                }
            }
            
            var rp = vec3.subtract(p, r);
            var rq = vec3.subtract(q, r);
            //Normal vector from the cross product of two vectors on a plane
            var cross = vec3.normalize(vec3.cross(rp, rq));

            //Add all the normals for each vertex
            for(var i = 0; i < 3; i++){
                normalData.push(cross[0]);
                normalData.push(cross[1]);
                normalData.push(cross[2]);
            }
        
            count = 0;
            tempData = [];

        }

    });

    return normalData;

}

function generateTextureData(numFaces){
    var newTextureData = [];

    for(var i = 0; i < numFaces; i++){
        newTextureData.concat([
            0, 0,
            0, 1,
            1, 0,
            0, 1,
            1, 1,
            1, 0,
        ]);
    }

    return newTextureData;
}

function generateColorData(sameColor, numFaces, originalColor){
    var newColorData = [];
    for(var i = 0; i < numFaces; i++){

        var color = originalColor;

        var r = color[0];
        var g = color[1];
        var b = color[2];

        if(!sameColor){
            r = Math.floor((Math.random() * 255) + 1);
            g = Math.floor((Math.random() * 255) + 1);
            b = Math.floor((Math.random() * 255) + 1);
        }

        for(var j = 0; j < 6; j++) {
            newColorData = newColorData.concat([r, g, b]);
        }
    }

    return newColorData;
}

function createMaterial(ambient = mat_ambient, diffuse = mat_diffuse, specular = mat_specular, shine = mat_shine, reflectivity = mat_reflectivity){

    var material = {
        ambient : ambient,
        diffuse : diffuse,
        specular : specular,
        shine : shine,
        reflectivity : reflectivity
    }

    return material;

}