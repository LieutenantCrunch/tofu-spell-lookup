// Default values for frame properties
export const FRAME_DEFAULTS = Object.freeze({
    defaultFont: 'D-DIN Condensed Bold',
    defaultHue: 0,
    defaultSaturation: 0,
    defaultLightness: 0,
    hideSeries: false,
    image: 'default',
    name: 'Default',
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
