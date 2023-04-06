function createCharacterSet(start, end) {
    let characterSet = [];
    for(let i = start; i <= end; i++) {
        characterSet.push(String.fromCodePoint(i));
    }
    return characterSet;
}

let basicLatin = createCharacterSet(0x20, 0x7e);
let latin1Supplement = createCharacterSet(0xa0, 0xff);
let latinExtendedA = createCharacterSet(0x0100, 0x017f);
let greek = createCharacterSet(0x0370, 0x03ff);
let cyrillic = createCharacterSet(0x0400, 0x04ff);

const UnicodeBlocks = {
    basicLatin: basicLatin,
    latin1Supplement: latin1Supplement,
    latinExtendedA: latinExtendedA,
    greek: greek,
    cyrillic: cyrillic,
};

module.exports = UnicodeBlocks;
