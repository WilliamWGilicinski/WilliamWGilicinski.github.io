var objData = {
    createData: async function(sameColor, textfile){
        var objData;
        this.name = textfile;
        this.material = createMaterial();

        return readJSONData(`./${textfile}.json`).then(json => {
            objData = json;
            return objData;
        });
    },

    "geoData": [],

    "colorData": [],

    "numFaces": [],

    "localScale": [20, 20, 20],

    "name": "",

    "material": {}

}

async function readJSONData(fileName){

    const response = await fetch(fileName);
    const json = await response.json();
    return json;

}