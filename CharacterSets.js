const UnicodeBlocks = require('./UnicodeBlocks.js');

let basicLatin = {
    fontFamilies: ['roboto', 'opensans'],
    characters: UnicodeBlocks.basicLatin,
};
let latin1Supplement = {
    fontFamilies: ['roboto', 'opensans'],
    characters: UnicodeBlocks.basicLatin + UnicodeBlocks.latin1Supplement,
};
let latinExtendedA = {
    fontFamilies: ['roboto', 'opensans'],
    characters: UnicodeBlocks.basicLatin + UnicodeBlocks.latin1Supplement
                + UnicodeBlocks.latinExtendedA,
};
let greek = {
    fontFamilies: ['roboto', 'opensans'],
    characters: UnicodeBlocks.basicLatin + UnicodeBlocks.greek,
};
let cyrillic = {
    fontFamilies: ['roboto', 'opensans'],
    characters: UnicodeBlocks.basicLatin + UnicodeBlocks.cyrillic,
};

const CharacterSets = {
    'basic-latin': basicLatin,
    'latin-1-supplement': latin1Supplement,
    'latin-extended-a': latinExtendedA,
    'greek': greek,
    'cyrillic': cyrillic,
};

module.exports = CharacterSets;
