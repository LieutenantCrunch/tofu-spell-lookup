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

    [62]: '2_peas_hearts_delight.ttf',
    [63]: 'a_childish_wonders.ttf',
    [64]: 'a_dripping_marker.ttf',
    [65]: 'abrushow.otf',
    [66]: 'abstract_groovy.otf',
    [67]: 'african.ttf',
    [68]: 'akar_rumput.otf',
    [69]: 'alex_brush.ttf',
    [70]: 'alice_in_wonderland.ttf',
    [71]: 'ambery_garden.ttf',
    [72]: 'angkanya_sebelas.otf',
    [73]: 'annyeong_haseyo.otf',
    [74]: 'antropos_freefont.ttf',
    [75]: 'ape_mount.otf',
    [76]: 'arabian_night.otf',
    [77]: 'arigatou_gozaimasu.ttf',
    [78]: 'assassin_ninja.otf',
    [79]: 'avqest.ttf',
    [80]: 'barely_enough.ttf',
    [81]: 'barrbar.otf',
    [82]: 'beauty_school_dropout.ttf',
    [83]: 'black_viper.otf',
    [84]: 'black_viper_textured.otf',
    [85]: 'black_letter_extra_bold.ttf',
    [86]: 'black_letter_shadow.ttf',
    [87]: 'blockway.ttf',
    [88]: 'blue_bubbles.otf',
    [89]: 'buster_down.otf',
    [90]: 'call_heart.otf',
    [91]: 'cambridge.otf',
    [92]: 'carnivalee_freakshow.ttf',
    [93]: 'cartoon_1471_extended.ttf',
    [94]: 'catalog.ttf',
    [95]: 'catcafe.ttf',
    [96]: 'catways.otf',
    [97]: 'ceceps_handwriting.ttf',
    [98]: 'chailce_noggin.ttf',
    [99]: 'chicken_katsu.otf',
    [100]: 'cloister_black_light.ttf',
    [101]: 'coffee_spark.otf',
    [102]: 'colakind.otf',
    [103]: 'collegiate_heavy_outline_medium.ttf',
    [104]: 'copyduck.otf',
    [105]: 'correction_brush.ttf',
    [106]: 'correction_tape.ttf',
    [107]: 'cownaffle.ttf',
    [108]: 'crafty_for_you.otf',
    [109]: 'curved.ttf',
    [110]: 'damion.ttf',
    [111]: 'december_show.otf',
    [112]: 'dimsum_week.otf',
    [113]: 'din_schablonierschrift.ttf',
    [114]: 'diogenes.ttf',
    [115]: 'dracula_condensed.ttf',
    [116]: 'dracula.ttf',
    [117]: 'driveby.ttf',
    [118]: 'droid_serif.ttf',
    [119]: 'droid_serif_bold.ttf',
    [120]: 'droid_serif_bold_italic.ttf',
    [121]: 'droid_serif_italic.ttf',
    [122]: 'dungeon_depths.ttf',
    [123]: 'dungeon_depths_italic.ttf',
    [124]: 'earthworm_jim.ttf',
    [125]: 'edge_of_the_galaxy_italic.otf',
    [126]: 'edge_of_the_galaxy_poster.otf',
    [127]: 'edge_of_the_galaxy_poster_italic.otf',
    [128]: 'edge_of_the_galaxy.otf',
    [129]: 'emperor_of_japan.otf',
    [130]: 'emperor_of_japan_bold.otf',
    [131]: 'emperor_of_japan_hollow.otf',
    [132]: 'emperor_of_japan_hollow_inverse.otf',
    [133]: 'emperor_of_japan_inverse.otf',
    [134]: 'emperor_of_japan_italic.otf',
    [135]: 'emperor_of_japan_light.otf',
    [136]: 'espresso_show.otf',
    [137]: 'evil_empire.ttf',
    [138]: 'ex_papa_bear.ttf',
    [139]: 'fairy_playground.ttf',
    [140]: 'final_frontier_old_style.ttf',
    [141]: 'freedom_45.otf',
    [142]: 'freshman.ttf',
    [143]: 'funky_coffee.otf',
    [144]: 'gamestation_condensed.otf',
    [145]: 'gamestation_condensed_oblique.otf',
    [146]: 'gamestation_display.otf',
    [147]: 'gamestation_display_oblique.otf',
    [148]: 'gamestation_display_obloutline.otf',
    [149]: 'gamestation_display_outline.otf',
    [150]: 'gamestation_extended.otf',
    [151]: 'gamestation_extended_oblique.otf',
    [152]: 'gamestation_storm.otf',
    [153]: 'gamestation_storm_oblique.otf',
    [154]: 'gamestation_text.otf',
    [155]: 'gamestation_text_obliq_outline.otf',
    [156]: 'gamestation_text_oblique.otf',
    [157]: 'gamestation_text_outline.otf',
    [158]: 'gamestation_warped.otf',
    [159]: 'gamestation_warped_oblique.otf',
    [160]: 'gedabrush.otf',
    [161]: 'geldotica.ttf',
    [162]: 'geldotica_heavy.ttf',
    [163]: 'geldotica_light.ttf',
    [164]: 'geldotica_thick.ttf',
    [165]: 'gerdu.otf',
    [166]: 'glitch_goblin.ttf',
    [167]: 'glorious_christmas.ttf',
    [168]: 'grand_hotel.ttf',
    [169]: 'grasshopper_sanatorium.ttf',
    [170]: 'great_vibes.ttf',
    [171]: 'grip.otf',
    [172]: 'grisly_beast.ttf',
    [173]: 'groovy.ttf',
    [174]: 'guttural.ttf',
    [175]: 'gypsy_curse.ttf',
    [176]: 'hachicro_undertale_battle.otf',
    [177]: 'haeresletter.otf',
    [178]: 'handwriting.ttf',
    [179]: 'hangyaku.ttf',
    [180]: 'harry_p.ttf',
    [181]: 'have_idea.otf',
    [182]: 'hearts.ttf',
    [183]: 'help_me.ttf',
    [184]: 'hirakatana.otf',
    [185]: 'hitagistationery.otf',
    [186]: 'home_video.ttf',
    [187]: 'home_video_bold.ttf',
    [188]: 'homewrecker.ttf',
    [189]: 'horrorfind.ttf',
    [190]: 'horrormaster.ttf',
    [191]: 'hvd_peace.ttf',
    [192]: 'in_living_color.ttf',
    [193]: 'iniya_display.otf',
    [194]: 'inkverse.ttf',
    [195]: 'it.ttf',
    [196]: 'japan_daisuki.otf',
    [197]: 'japan_rich.ttf',
    [198]: 'japan_version.ttf',
    [199]: 'katana.ttf',
    [200]: 'kool_beans.ttf',
    [201]: 'leporid.ttf',
    [202]: 'leporid_italic.ttf',
    [203]: 'letra_de_su_hija.ttf',
    [204]: 'loftygoals.otf',
    [205]: 'lord_juusai.ttf',
    [206]: 'lost_fish.ttf',
    [207]: 'lostina.otf',
    [208]: 'love_of_love_by_oubyc.ttf',
    [209]: 'magic_school_one.ttf',
    [210]: 'magic_school_two.ttf',
    [211]: 'mangabey.otf',
    [212]: 'mango_juicy.ttf',
    [213]: 'luke_cage.ttf',
    [214]: 'the_punisher.ttf',
    [215]: 'mattehek_free.otf',
    [216]: 'medieval_times.ttf',
    [217]: 'minecraft_bold.otf',
    [218]: 'minecraft_bold_italic.otf',
    [219]: 'minecraft_italic.otf',
    [220]: 'minecraft.otf',
    [221]: 'minne_petat.ttf',
    [222]: 'mkhedruli_grunge_italic.ttf',
    [223]: 'mkhedruli_grunge.ttf',
    [224]: 'mockery.ttf',
    [225]: 'moswald.otf',
    [226]: 'motley_forces.ttf',
    [227]: 'mouldy_cheese.ttf',
    [228]: 'movie_posters_delight.ttf',
    [229]: 'mr_robot.ttf',
    [230]: 'new_walt_disney.ttf',
    [231]: 'walt_disney.ttf',
    [232]: 'njal_bold.otf',
    [233]: 'norse.otf',
    [234]: 'norse_bold.otf',
    [235]: 'odalisque.ttf',
    [236]: 'olde_english.ttf',
    [237]: 'oldnewspapertypes.ttf',
    [238]: 'one_piece.ttf',
    [239]: 'operation_napalm.ttf',
    [240]: 'operation_napalm_italic.ttf',
    [241]: 'afterlife.ttf',
    [242]: 'parisienne.ttf',
    [243]: 'park_lane_nf.ttf',
    [244]: 'party_confetti.ttf',
    [245]: 'pixeloid_mono.ttf',
    [246]: 'pixeloid_sans.ttf',
    [247]: 'pixeloid_sans_bold.ttf',
    [248]: 'pixgamer.ttf',
    [249]: 'playball.ttf',
    [250]: 'primus.ttf',
    [251]: 'christmas_ornamen.otf',
    [252]: 'public_pixel.ttf',
    [253]: 'quantumregular.otf',
    [254]: 'qumpellkano12.otf',
    [255]: 'ra_bali.ttf',
    [256]: 'rain_in_november.otf',
    [257]: 'really_free.ttf',
    [258]: 'ro_twimch.ttf',
    [259]: 'roblox.ttf',
    [260]: 'rony_siswadi_15.ttf',
    [261]: 'rony_siswadi_15_bold.ttf',
    [262]: 'rusty_hooks.ttf',
    [263]: 'sansilk.otf',
    [264]: 'sejjarah.otf',
    [265]: 'senja_santuy.otf',
    [266]: 'sepet.otf',
    [267]: 'serial_publication.ttf',
    [268]: 'shabina.otf',
    [269]: 'shimura.ttf',
    [270]: 'shojumaru.ttf',
    [271]: 'soop_kitchen.ttf',
    [272]: 'south_park_smilie.ttf',
    [273]: 'sparky_stones.ttf',
    [274]: 'spicy_sushi.otf',
    [275]: 'spinstee.ttf',
    [276]: 'sho_card_caps.ttf'
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
