# msdf-fonts
Repository for MSDF font files for rendering 2D text in WebGL
To learn more about MSDF, see this repo https://github.com/Chlumsky/msdfgen

#### How to use
In your application code, use any CDN for Open Source Projects like jsdelivr or cdnjs to reference your desired font. You can access the full font files under `/build/`, or subsets of characters based on Unicode Blocks under `/build/subsets/` if you want to load smaller files
```javascript
let fontJSON = "https://cdn.jsdelivr.net/npm/msdf-fonts/build/OpenSans-Regular-msdf.json";
let fontImage = "https://cdn.jsdelivr.net/npm/msdf-fonts/build/OpenSans-Regular-msdf.png";
```

#### Character Subsets
The following Character Subsets are currently supported if you want to load smaller files. These files are located in the `/build` folder as follows: `/build/subsets/{characterSet}-{fontFamily}-{weight+style}-msdf.{png|json}`
|Character Set Name|Includes|List of Characters|
|---|---|---|
|basic-latin||`` !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{\|}~``|
|latin-1-supplement|basic-latin|`` ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ``|
|latin-extended-a|basic-latin, latin-1-supplement|``ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſ``|
|greek|basic-latin|``ͰͱͲͳʹ͵Ͷͷ͸͹ͺͻͼͽ;Ϳ΀΁΂΃΄΅Ά·ΈΉΊ΋Ό΍ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿ``|
|cyrillic|basic-latin|``ЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюяѐёђѓєѕіїјљњћќѝўџѠѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѶѷѸѹѺѻѼѽѾѿҀҁ҂҃҄҅҆҇҈҉ҊҋҌҍҎҏҐґҒғҔҕҖҗҘҙҚқҜҝҞҟҠҡҢңҤҥҦҧҨҩҪҫҬҭҮүҰұҲҳҴҵҶҷҸҹҺһҼҽҾҿӀӁӂӃӄӅӆӇӈӉӊӋӌӍӎӏӐӑӒӓӔӕӖӗӘәӚӛӜӝӞӟӠӡӢӣӤӥӦӧӨөӪӫӬӭӮӯӰӱӲӳӴӵӶӷӸӹӺӻӼӽӾӿ``|

#### Adding fonts
* Create a folder for the new font family in all lowercase under `/fonts`
* Add all your .ttf files to that new folder
* Add the name of the font folder to `FontFamilies.js` in the `fontFolders` list
* (Optionally) Add your font folder name to the relavant Character Sets in `CharacterSets.js`
* Run `npm start`
* Open a pull request :)

#### Adding Character Sets to support more languages
Create a GitHub issue with details for your Character Set. Ideally you provide information about what Unicode Blocks would be used ([You can see blocks here](https://www.utf8-chartable.de/unicode-utf8-table.pl)). If that confuses you, just open a pull request anyways and I'll try to help the best I can

#### Adding Custom Character Sets
I'll probably say no, but you can try and ask anyways if you have a good reason

#### Please Help
If you have any ideas on how to better structure this repo, I'd love to hear you out! Don't hesitate to reach out with a GitHub issue detailing your ideas
