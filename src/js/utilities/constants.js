export const INTERSECTION_OBSERVER_SUPPORTED = typeof(IntersectionObserver) !== 'undefined';

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
    [27]: 'Pecita' /* Pecita */
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

// User-friendly names of the blend spell types
export const USER_FRIENDLY_BLEND_TYPES = Object.freeze({
    [SPELL_TYPES.COLOR]: 'Color',
    [SPELL_TYPES.OVERLAY]: 'Overlay',
    [SPELL_TYPES.DARKEN]: 'Darken',
    [SPELL_TYPES.NORMAL]: 'Normal',
    [SPELL_TYPES.SCREEN]: 'Screen',
    [SPELL_TYPES.SOFT_LIGHT]: 'Soft Light'
});
