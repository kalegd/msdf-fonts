const fs = require('fs');

let fontFolders = ['roboto', 'opensans'];

const FontFamilies = {};

for(let fontFolder of fontFolders) {
    FontFamilies[fontFolder] = [];
    let files = fs.readdirSync(__dirname + '/fonts/' + fontFolder);
    for(let file of files) {
        FontFamilies[fontFolder].push(file.replace('.ttf', ''));
    }
}

module.exports = FontFamilies;
