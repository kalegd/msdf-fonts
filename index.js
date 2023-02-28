const fs = require('fs');
const generateBMFont = require('msdf-bmfont-xml');

const OpenSansRegular = {
    filename: 'OpenSans-Regular',
    outputType: 'json',
    textureSize: [512, 512],
    pot: true,
};
let openSansRegularTTF = fs.readFileSync('./fonts/OpenSans-Regular.ttf');

//Utility function because I hate the spacing of '|' in OpenSans-Regular
function updateCharacterParams(json, character, updates) {
    for(let details of json.chars) {
        if(details['char'] == character) {
            for(let param in updates) {
                details[param] = updates[param];
            }
            return;
        }
    }
    throw new Error('Character not found for updates');
}

generateBMFont(openSansRegularTTF, OpenSansRegular, (error, textures, font) => {
    if(error) throw error;
    if(textures.length > 1)
        throw new Error('textureSize not large enough to fit all characters');
    let texture = textures[0].texture;
    let json = JSON.parse(font.data);
    updateCharacterParams(json, '|', { xoffset: 2, xadvance: 11 });
    fs.writeFileSync('./build/OpenSans-Regular-msdf.png', texture);
    fs.writeFileSync('./build/OpenSans-Regular-msdf.json',JSON.stringify(json));
});
