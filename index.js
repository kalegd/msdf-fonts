const fs = require('fs');
const generateBMFont = require('msdf-bmfont-xml');
const opentype = require('opentype.js');
const CharacterSets = require('./CharacterSets.js');
const CustomCharacterSets = require('./CustomCharacterSets.js');
const FontFamilies = require('./FontFamilies.js');
const UnicodeBlocks = require('./UnicodeBlocks.js');
const MAX_TEXTURE_SIZE = 2048;

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

function getCharsetFromGlyphs(glyphs) {
    let characters = [];
    for(let id in glyphs) {
        let unicode = glyphs[id].unicode;
        if(unicode) characters.push(String.fromCodePoint(unicode));
    }
    return characters;
}

function _generateFont(ttf, folder, params, overrides, resizeIndex, resolve, reject) {
    generateBMFont(ttf, params, (error, textures, font) => {
        if(error) {
            reject(error);
            return;
        } else if(textures.length > 1) {
            if(params.textureSize[0] >= MAX_TEXTURE_SIZE) {
                reject('MAX_TEXTURE_SIZE is not large enough to fit all '
                    + 'characters for ' + params.filename);
            } else {
                //It's possible for 3 textures to fit in 1 that's twice the size
                //in the case where the third has very few characters that fit
                //in additional space of the larger 1. Hence why I use 4 below
                let length = textures.length;
                while(length >= 4) {
                    params.textureSize[0] *= 2;
                    params.textureSize[1] *= 2;
                    length /= 4;
                }
                if(length >= 2) {
                    params.textureSize[resizeIndex] *= 2;
                    resizeIndex = (resizeIndex + 1) % 2;
                }
                _generateFont(ttf, folder, params, overrides, resizeIndex,
                    resolve, reject);
            }
            return;
        }
        let texture = textures[0].texture;
        let json = JSON.parse(font.data);
        if(overrides) {
            for(let override of overrides) {
                updateCharacterParams(json, override.character,
                    override.params);
            }
        }
        fs.writeFileSync(folder + params.filename + '.png', texture);
        fs.writeFileSync(folder + params.filename + '.json',
            JSON.stringify(json));
        resolve();
    });
}

async function generateFont(ttf, folder, filename, charset, overrides) {
    params = {
        filename: filename,
        outputType: 'json',
        textureSize: [128, 128],
        pot: true,
        charset: charset,
    };
    let path = folder + filename;
    if(fs.existsSync(path + '.png') && fs.existsSync(path + '.json'))
        return Promise.resolve();
    return new Promise((resolve, reject) => {
        _generateFont(ttf, folder, params, overrides, 0, resolve,
            reject);
    });
}

async function buildCustom() {
    let openSansRegularTTF = fs.readFileSync(__dirname
        + '/fonts/opensans/OpenSans-Regular.ttf');
    let robotoRegularTTF = fs.readFileSync(__dirname
        + '/fonts/roboto/Roboto-Regular.ttf');
    let folder = __dirname + '/build/custom/';
    fs.mkdirSync(folder, { recursive: true});
    try {
        await generateFont(openSansRegularTTF, folder,
            'digitalbacon-OpenSans-Regular-msdf',
            CustomCharacterSets['digitalbacon'],
            [{ character: '|', params: { xoffset: 2, xadvance: 11 }}]);
        await generateFont(robotoRegularTTF, folder,
            'three-mesh-ui-Roboto-Regular-msdf',
            CustomCharacterSets['three-mesh-ui']);
    } catch(err) {
        console.error(err);
        return;
    }
}

async function buildSubsets() {
    for(let charsetFolder in CharacterSets) {
        let charset = CharacterSets[charsetFolder];
        for(let family of charset.fontFamilies) {
            let msdfFolder = __dirname + '/build/subsets/';
            fs.mkdirSync(msdfFolder, { recursive: true});
            let fontNames = FontFamilies[family];
            for(let fontName of fontNames) {
                let ttf = fs.readFileSync(__dirname + '/fonts/' + family + '/'
                    + fontName + '.ttf');
                try {
                    await generateFont(ttf, msdfFolder, charsetFolder + '-'
                        + fontName + '-msdf', charset.characters);
                } catch(err) {
                    console.error(err);
                    return;
                }
            }
        }
    }
}

async function build() {
    for(let family in FontFamilies) {
        let fontNames = FontFamilies[family];
        for(let fontName of fontNames) {
            let ttfPath = __dirname + '/fonts/' + family + '/' + fontName
                + '.ttf';
            let msdfFolder = __dirname + '/build/';
            fs.mkdirSync(msdfFolder, { recursive: true});
            let ttf = fs.readFileSync(ttfPath);
            let fontInfo = opentype.loadSync(ttfPath);
            let charset = getCharsetFromGlyphs(fontInfo.glyphs.glyphs);
            try {
                await generateFont(ttf, msdfFolder, fontName + '-msdf',charset);
            } catch(err) {
                console.error(err);
                return;
            }
        }
    }
    await buildSubsets();
    await buildCustom();
}

build().then(() => { console.log("Finished"); });
