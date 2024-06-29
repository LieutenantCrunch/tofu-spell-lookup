// Default values for frame properties
export const FRAME_DEFAULTS = Object.freeze({
    defaultFont: 'D-DIN Condensed Bold',
    defaultHue: 0,
    defaultSaturation: 0,
    defaultLightness: 0,
    hideSeries: false,
    image: 'default',
    name: 'Edition 1',
    nameAlignment: 'center',
    seriesAlignment: 'center',
    swapNameAndSeries: false,
});

// Emoji for the different types of frame sources
export const FRAME_SOURCE_EMOJIS = Object.freeze({
    'Anniversary Achievement': '🎂',
    'Code Redemption': '🔤',
    'Event': '🎊',
    'Event Frame Chest': '🗝️',
    'Gold': '🪙',
    'Monthly': '📅',
    'Premium': '💎',
    'PvP': '👊',
    'Shard': '⚔️',
    'Special Achievement': '✨',
});

// The order of these is the order they will display in the Settings Menu
export const HIGHLIGHT_NEW_SPELLS_OPTIONS = Object.freeze({
    PAST_24_HOURS: {
        key: '24-hours',
        title: 'From Past 24 Hours',
    },
    LAST_VISIT: {
        key: 'last-visit',
        title: 'Since Last Visit',
    },
    NO_HIGHLIGHT: {
        key: 'no-highlight',
        title: 'Do Not Highlight',
    },
});

// The order of these is the order they will display in the Settings Menu
export const HIGHLIGHT_STYLE_OPTIONS = Object.freeze({
    NEW_LABEL: {
        key: 'new-label',
        title: '"new!" Label',
    },
    HIGHLIGHTER: {
        key: 'highlighter',
        title: 'Highlighter',
    },
});

export const INTERSECTION_OBSERVER_SUPPORTED = typeof(IntersectionObserver) !== 'undefined';

export const MINI_FRAME_SCALE = 13 / 30;

// Enumeration of spell types for ease of coding
export const SPELL_TYPES = Object.freeze({
    ALL: -1, // Custom, not official
    HUE_SHIFT: 1,
    COLOR: 2,
    OVERLAY: 3,
    DARKEN: 4,
    NORMAL: 5,
    SCREEN: 6,
    SOFT_LIGHT: 7,
    TEXT_COLOR: 8,
    TEXT_FONT: 9,
    FILTER: 10,
    TEXT_GLOW: 11
});

// Must come after SPELL_TYPES above
// Mapping of spell blend modes (based on type) to CSS blend mode values
export const SPELL_BLEND_MODES = Object.freeze({
    [SPELL_TYPES.COLOR]: 'color',
    [SPELL_TYPES.OVERLAY]: 'overlay',
    [SPELL_TYPES.DARKEN]: 'darken',
    [SPELL_TYPES.NORMAL]: 'normal',
    [SPELL_TYPES.SCREEN]: 'screen',
    [SPELL_TYPES.SOFT_LIGHT]: 'soft-light'
});

// Mapping of Text Font spell values to actual font names
export const SPELL_FONTS = Object.freeze({
    [1]: '712 Serif', /* 7:12 Serif */
    [2]: 'Acme', /* Acme (Regular) */
    [3]: 'Actionis', /* Action Is */
    [4]: 'Adler', /* Adler */
    [5]: 'Aguafina', /* Aguafina Script (Regular) */
    [6]: 'Anglican', /* Anglican Text */
    [7]: 'School', /* Back to School (Regular) */
    [8]: 'Beon', /* Beon */
    [9]: 'Shattered', /* Broken Glass (Regular) */
    [10]: 'Campfire', /* Campfire */
    [11]: 'Cheveux', /* Cheveux D'ange */
    [12]: 'Roboto', /* Roboto (Regular) */
    [13]: 'Pirulen', /* Pirulen (Regular) */
    [14]: 'Water', /* World of Water (Regular) */
    [15]: 'Ostrich', /* Ostrich Sans Bold */
    [16]: 'Painty', /* Painty Paint */
    [17]: 'Mexcellent', /* Mexcellent 3D */
    [18]: 'Kamikaze', /* Kamikaze */
    [19]: 'Norwester', /* Norwester */
    [20]: 'Japan', /* Pray for Japan (Regular) */
    [21]: 'Hemi', /* Hemi Head */
    [22]: 'Facon', /* Facon */
    [23]: 'Emilio', /* Emilio 20 */
    [24]: 'Clip', /* Clip */
    [25]: 'Cookie', /* Cookie (Regular) */
    [26]: 'Njnaruto', /* Ninja Naruto */
    [27]: 'Pecita', /* Pecita */
    [28]: 'Advent',
    [29]: 'Amatic',
    [30]: 'Architex',
    [31]: 'Arcon',
    [32]: 'Attic',
    [33]: 'Barbaro',
    [34]: 'Barlow',
    [35]: 'Blackops',
    [36]: 'Berkshire',
    [37]: 'Wonderland',
    [38]: 'Bonbon',
    [39]: 'Burnstown',
    [40]: 'Cabin',
    [41]: 'Conformity',
    [42]: 'DaggerSquare',
    [43]: 'Dancing Script',
    [44]: 'Decorative',
    [45]: 'Dosis',
    [46]: 'Chocolade',
    [47]: 'Ethnocentric',
    [48]: 'Fonarto',
    [49]: 'Gunplay',
    [50]: 'Kingthings Christmas',
    [51]: 'Luckiest Guy',
    [52]: 'Magnolia',
    [53]: 'Nasalization',
    [54]: 'Oregano',
    [55]: 'Polya',
    [56]: 'Pricedown',
    [57]: 'Righteous',
    [58]: 'Satisfy',
    [59]: 'Sho Card Caps',
    [60]: 'Teen',
    [61]: 'Orbitron',

    [62]: '2 Peas Hearts Delight',
    [63]: 'A Childish Wonders',
    [64]: 'A Dripping Marker',
    [65]: 'Abrushow',
    [66]: 'Abstract Groovy',
    [67]: 'African',
    [68]: 'Akar Rumput',
    [69]: 'Alex Brush',
    [70]: 'Alice In Wonderland',
    [71]: 'Ambery Garden',
    [72]: 'Angkanya Sebelas',
    [73]: 'Annyeong Haseyo',
    [74]: 'Antropos Freefont',
    [75]: 'Ape Mount',
    [76]: 'Arabian Night',
    [77]: 'Arigatou Gozaimasu',
    [78]: 'Assassin Ninja',
    [79]: 'Avqest',
    [80]: 'Barely Enough',
    [81]: 'Barrbar',
    [82]: 'Beauty School Dropout',
    [83]: 'Black Viper',
    [84]: 'Black Viper Textured',
    [85]: 'Black Letter Extra Bold',
    [86]: 'Black Letter Shadow',
    [87]: 'Blockway',
    [88]: 'Blue Bubbles',
    [89]: 'Buster Down',
    [90]: 'Call Heart',
    [91]: 'Cambridge',
    [92]: 'Carnivalee Freakshow',
    [93]: 'Cartoon 1471 Extended',
    [94]: 'Catalog',
    [95]: 'Catcafe',
    [96]: 'Catways',
    [97]: 'Ceceps Handwriting',
    [98]: 'Chailce Noggin',
    [99]: 'Chicken Katsu',
    [100]: 'Cloister Black Light',
    [101]: 'Coffee Spark',
    [102]: 'Colakind',
    [103]: 'Collegiate Heavy Outline Medium',
    [104]: 'Copyduck',
    [105]: 'Correction Brush',
    [106]: 'Correction Tape',
    [107]: 'Cownaffle',
    [108]: 'Crafty For You',
    [109]: 'Curved',
    [110]: 'Damion',
    [111]: 'December Show',
    [112]: 'Dimsum Week',
    [113]: 'Din Schablonierschrift',
    [114]: 'Diogenes',
    [115]: 'Dracula Condensed',
    [116]: 'Dracula',
    [117]: 'Driveby',
    [118]: 'Droid Serif',
    [119]: 'Droid Serif Bold',
    [120]: 'Droid Serif Bold Italic',
    [121]: 'Droid Serif Italic',
    [122]: 'Dungeon Depths',
    [123]: 'Dungeon Depths Italic',
    [124]: 'Earthworm Jim',
    [125]: 'Edge Of The Galaxy Italic',
    [126]: 'Edge Of The Galaxy Poster',
    [127]: 'Edge Of The Galaxy Poster Italic',
    [128]: 'Edge Of The Galaxy',
    [129]: 'Emperor Of Japan',
    [130]: 'Emperor Of Japan Bold',
    [131]: 'Emperor Of Japan Hollow',
    [132]: 'Emperor Of Japan Hollow Inverse',
    [133]: 'Emperor Of Japan Inverse',
    [134]: 'Emperor Of Japan Italic',
    [135]: 'Emperor Of Japan Light',
    [136]: 'Espresso Show',
    [137]: 'Evil Empire',
    [138]: 'Ex Papa Bear',
    [139]: 'Fairy Playground',
    [140]: 'Final Frontier Old Style',
    [141]: 'Freedom 45',
    [142]: 'Freshman',
    [143]: 'Funky Coffee',
    [144]: 'Gamestation Condensed',
    [145]: 'Gamestation Condensed Oblique',
    [146]: 'Gamestation Display',
    [147]: 'Gamestation Display Oblique',
    [148]: 'Gamestation Display Obloutline',
    [149]: 'Gamestation Display Outline',
    [150]: 'Gamestation Extended',
    [151]: 'Gamestation Extended Oblique',
    [152]: 'Gamestation Storm',
    [153]: 'Gamestation Storm Oblique',
    [154]: 'Gamestation Text',
    [155]: 'Gamestation Text Obliq Outline',
    [156]: 'Gamestation Text Oblique',
    [157]: 'Gamestation Text Outline',
    [158]: 'Gamestation Warped',
    [159]: 'Gamestation Warped Oblique',
    [160]: 'Gedabrush',
    [161]: 'Geldotica',
    [162]: 'Geldotica Heavy',
    [163]: 'Geldotica Light',
    [164]: 'Geldotica Thick',
    [165]: 'Gerdu',
    [166]: 'Glitch Goblin',
    [167]: 'Glorious Christmas',
    [168]: 'Grand Hotel',
    [169]: 'Grasshopper Sanatorium',
    [170]: 'Great Vibes',
    [171]: 'Grip',
    [172]: 'Grisly Beast',
    [173]: 'Groovy',
    [174]: 'Guttural',
    [175]: 'Gypsy Curse',
    [176]: 'Hachicro Undertale Battle',
    [177]: 'Haeresletter',
    [178]: 'Handwriting',
    [179]: 'Hangyaku',
    [180]: 'Harry P',
    [181]: 'Have Idea',
    [182]: 'Hearts',
    [183]: 'Help Me',
    [184]: 'Hirakatana',
    [185]: 'Hitagistationery',
    [186]: 'Home Video',
    [187]: 'Home Video Bold',
    [188]: 'Homewrecker',
    [189]: 'Horrorfind',
    [190]: 'Horrormaster',
    [191]: 'Hvd Peace',
    [192]: 'In Living Color',
    [193]: 'Iniya Display',
    [194]: 'Inkverse',
    [195]: 'It',
    [196]: 'Japan Daisuki',
    [197]: 'Japan Rich',
    [198]: 'Japan Version',
    [199]: 'Katana',
    [200]: 'Kool Beans',
    [201]: 'Leporid',
    [202]: 'Leporid Italic',
    [203]: 'Letra De Su Hija',
    [204]: 'Loftygoals',
    [205]: 'Lord Juusai',
    [206]: 'Lost Fish',
    [207]: 'Lostina',
    [208]: 'Love Of Love By Oubyc',
    [209]: 'Magic School One',
    [210]: 'Magic School Two',
    [211]: 'Mangabey',
    [212]: 'Mango Juicy',
    [213]: 'Luke Cage',
    [214]: 'The Punisher',
    [215]: 'Mattehek Free',
    [216]: 'Medieval Times',
    [217]: 'Minecraft Bold',
    [218]: 'Minecraft Bold Italic',
    [219]: 'Minecraft Italic',
    [220]: 'Minecraft',
    [221]: 'Minne Petat',
    [222]: 'Mkhedruli Grunge Italic',
    [223]: 'Mkhedruli Grunge',
    [224]: 'Mockery',
    [225]: 'Moswald',
    [226]: 'Motley Forces',
    [227]: 'Mouldy Cheese',
    [228]: 'Movie Posters Delight',
    [229]: 'Mr Robot',
    [230]: 'New Walt Disney',
    [231]: 'Walt Disney',
    [232]: 'Njal Bold',
    [233]: 'Norse',
    [234]: 'Norse Bold',
    [235]: 'Odalisque',
    [236]: 'Olde English',
    [237]: 'Oldnewspapertypes',
    [238]: 'One Piece',
    [239]: 'Operation Napalm',
    [240]: 'Operation Napalm Italic',
    [241]: 'Afterlife',
    [242]: 'Parisienne',
    [243]: 'Park Lane Nf',
    [244]: 'Party Confetti',
    [245]: 'Pixeloid Mono',
    [246]: 'Pixeloid Sans',
    [247]: 'Pixeloid Sans Bold',
    [248]: 'Pixgamer',
    [249]: 'Playball',
    [250]: 'Primus',
    [251]: 'Christmas Ornamen',
    [252]: 'Public Pixel',
    [253]: 'Quantumregular',
    [254]: 'Qumpellkano12',
    [255]: 'Ra Bali',
    [256]: 'Rain In November',
    [257]: 'Really Free',
    [258]: 'Ro Twimch',
    [259]: 'Roblox',
    [260]: 'Rony Siswadi 15',
    [261]: 'Rony Siswadi 15 Bold',
    [262]: 'Rusty Hooks',
    [263]: 'Sansilk',
    [264]: 'Sejjarah',
    [265]: 'Senja Santuy',
    [266]: 'Sepet',
    [267]: 'Serial Publication',
    [268]: 'Shabina',
    [269]: 'Shimura',
    [270]: 'Shojumaru',
    [271]: 'Soop Kitchen',
    [272]: 'South Park Smilie',
    [273]: 'Sparky Stones',
    [274]: 'Spicy Sushi',
    [275]: 'Spinstee',
    [276]: 'Sho Card Caps'
});

// Switch the property names used based on a Webpack-Defined variable
export const SPELL_PROPERTIES = MODE === 'Production'
? Object.freeze({
    ID: '0',
    USER_ID: '1',
    SPELL_CODE: '2',
    TYPE: '3',
    VALUE: '4',
    DATE_MODIFIED: '5',
    USED: '6',
    VALUE2: '7'
})
: Object.freeze({
    ID: 'id',
    USER_ID: 'user_id',
    SPELL_CODE: 'spell_code',
    TYPE: 'type',
    VALUE: 'value',
    DATE_MODIFIED: 'date_modified',
    USED: 'used',
    VALUE2: 'value2'
});

// Whethe browser supports local storage
export const STORAGE_SUPPORTED = typeof(Storage) !== 'undefined';

// Map Text Align values to Justify Content values
export const TEXT_ALIGN_TO_JUSTIFY_CONTENT = Object.freeze({
    'center': 'center',
    'end': 'flex-end',
    'left': 'flex-start',
    'right': 'flex-end',
    'start': 'flex-start',
});

// User-friendly names of the blend spell types
export const USER_FRIENDLY_BLEND_TYPES = Object.freeze({
    [SPELL_TYPES.COLOR]: 'Color',
    [SPELL_TYPES.OVERLAY]: 'Overlay',
    [SPELL_TYPES.DARKEN]: 'Darken',
    [SPELL_TYPES.NORMAL]: 'Normal',
    [SPELL_TYPES.SCREEN]: 'Screen',
    [SPELL_TYPES.SOFT_LIGHT]: 'Soft Light'
});
