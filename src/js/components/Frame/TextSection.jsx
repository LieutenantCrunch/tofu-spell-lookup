import React, { useEffect, useMemo, useRef, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';
import {
    selectCurrentFont,
    selectCurrentFrame,
    selectCurrentName,
    selectCurrentSeries,
    selectCurrentTestFont
} from '../../redux/slices/currentSelections';
import {
    selectSearchTempTextColor,
    selectSearchTextColor,
    selectSearchTextColorHue,
    selectSearchTextColorSaturation,
    selectSearchTextColorLightness
} from '../../redux/slices/searches/textColor';
import {
    selectSearchTempTextGlow,
    selectSearchTextGlow,
    selectSearchTextGlowHue,
    selectSearchTextGlowSaturation,
    selectSearchTextGlowLightness,
    selectSearchTextGlowIntensity
} from '../../redux/slices/searches/textGlow';

// Utilities
import {
    FRAME_DEFAULTS,
    TEXT_ALIGN_TO_JUSTIFY_CONTENT,
} from '../../utilities/constants';
import {
    addUnitsOfMeasurement,
} from '../../utilities/utilities';

export const TextSection = ({
    scale = 1,
}) => {
    const MAX_NAME_FONT_SIZE = 250;
    const MAX_SERIES_FONT_SIZE = 200;

    const currentFont = useSelector(selectCurrentFont);
    const currentTestFont = useSelector(selectCurrentTestFont);
    const currentFrame = useSelector(selectCurrentFrame);
    const currentName = useSelector(selectCurrentName);
    const currentSeries = useSelector(selectCurrentSeries);
    
    // Text Color
    const searchTextColor = useSelector(selectSearchTextColor);
    const searchTextColorHue = useSelector(selectSearchTextColorHue);
    const searchTextColorSaturation = useSelector(selectSearchTextColorSaturation);
    const searchTextColorLightness = useSelector(selectSearchTextColorLightness);
    const searchTempTextColor = useSelector(selectSearchTempTextColor);

    const textColorToUse = searchTempTextColor || searchTextColor;

    const textColor = textColorToUse
        ? `hsl(${textColorToUse.hue}, ${textColorToUse.saturation}%, ${textColorToUse.lightness}%)`
        : `hsl(${searchTextColorHue}, ${searchTextColorSaturation}%, ${searchTextColorLightness}%)`;

    // Text Glow
    const searchTextGlow = useSelector(selectSearchTextGlow);
    const searchTextGlowHue = useSelector(selectSearchTextGlowHue);
    const searchTextGlowSaturation = useSelector(selectSearchTextGlowSaturation);
    const searchTextGlowLightness = useSelector(selectSearchTextGlowLightness);
    const searchTextGlowIntensity = useSelector(selectSearchTextGlowIntensity);
    const searchTempTextGlow = useSelector(selectSearchTempTextGlow);

    const textGlowToUse = searchTempTextGlow || searchTextGlow;

    const textGlow = textGlowToUse
        ? `hsl(${textGlowToUse.hue}, ${textGlowToUse.saturation}%, ${textGlowToUse.lightness}%)`
        : `hsl(${searchTextGlowHue}, ${searchTextGlowSaturation}%, ${searchTextGlowLightness}%)`;

    const textGlowIntensity = textGlowToUse
        ? textGlowToUse.intensity
        : searchTextGlowIntensity;
    
    const fontFamily = currentFont
        ? currentFont.fontFamily
        : (
            currentTestFont
            ? currentTestFont
            : (
                currentFrame 
                ? (currentFrame.defaultFont ?? FRAME_DEFAULTS.defaultFont)
                : FRAME_DEFAULTS.defaultFont
            )
        );
    const hideSeries = Boolean(currentFrame?.hideSeries);
    const swapNameAndSeries = Boolean(currentFrame?.swapNameAndSeries);
    const nameAlignment = currentFrame?.nameAlignment ?? FRAME_DEFAULTS.nameAlignment;
    const nameJustification = TEXT_ALIGN_TO_JUSTIFY_CONTENT[nameAlignment];
    const seriesAlignment = currentFrame?.seriesAlignment ?? FRAME_DEFAULTS.seriesAlignment;
    const seriesJustification = TEXT_ALIGN_TO_JUSTIFY_CONTENT[seriesAlignment];

    let {
        nameHeight,
        nameLeft,
        nameTop,
        nameWidth,
    } = useMemo(() => {
        const {
            h = 47,
            x = 62,
            y = 14,
            w = 176,
        } = currentFrame?.nameRect ?? {};

        return {
            nameHeight: addUnitsOfMeasurement(h * scale, 'px'),
            nameLeft: addUnitsOfMeasurement(x * scale, 'px'),
            nameTop: addUnitsOfMeasurement(y * scale, 'px'),
            nameWidth: addUnitsOfMeasurement(w * scale, 'px'),
        };
    }, [currentFrame, scale]);

    const {
        seriesHeight,
        seriesLeft,
        seriesTop,
        seriesWidth,
    } = useMemo(() => {
        const {
            h = 47,
            x = 62,
            y = 389,
            w = 176,
        } = currentFrame?.seriesRect ?? {};

        return {
            seriesHeight: addUnitsOfMeasurement(h * scale, 'px'),
            seriesLeft: addUnitsOfMeasurement(x * scale, 'px'),
            seriesTop: addUnitsOfMeasurement(y * scale, 'px'),
            seriesWidth: addUnitsOfMeasurement(w * scale, 'px'),
        };
    }, [currentFrame, scale]);

    let topText = currentName;
    let bottomText = currentSeries;

    // If we're hiding the series, set the bottomText to null
    if (hideSeries) {
        bottomText = null;
    }

    // If we're swapping the name and series, then swap their positions now
    if (swapNameAndSeries) {
        const tempText = bottomText;

        bottomText = topText;
        topText = tempText;
    }

    const topEl = useRef(null);
    const bottomEl = useRef(null);

    // Used for resizing the font to fit within the div
    const [topTextState, setTopTextState] = useState({
        currentSize: MAX_NAME_FONT_SIZE,
        recalculateIndex: 0
    })
    const [bottomTextState, setBottomTextState] = useState({
        currentSize: MAX_SERIES_FONT_SIZE,
        recalculateIndex: 0
    });

    // Trigger a recalculate when any property changes that could affect the top text
    useEffect(() => {
        setTopTextState(prevState => ({
            currentSize: MAX_NAME_FONT_SIZE,
            recalculateIndex: prevState.recalculateIndex + 1
        }));
    }, [topText, fontFamily, currentFrame]);

    // Trigger a recalculate when any property changes that could affect the bottom text
    useEffect(() => {
        setBottomTextState(prevState => ({
            currentSize: MAX_SERIES_FONT_SIZE,
            recalculateIndex: prevState.recalculateIndex + 1
        }));
    }, [bottomText, fontFamily, currentFrame]);

    useEffect(() => {
        if (topText) {
            const testEl = topEl.current;

            if (testEl && (testEl.offsetHeight < testEl.scrollHeight || testEl.offsetWidth < testEl.scrollWidth)) {
                setTopTextState(prevState => ({
                    ...prevState,
                    currentSize: prevState.currentSize - 10
                }));
            }
        }
    }, [topText, topTextState]);

    useEffect(() => {
        if (bottomText) {
            const testEl = bottomEl.current;

            if (testEl && (testEl.offsetHeight < testEl.scrollHeight || testEl.offsetWidth < testEl.scrollWidth)) {
                setBottomTextState(prevState => ({
                    ...prevState,
                    currentSize: prevState.currentSize - 10
                }));
            }
        }
    }, [bottomText, bottomTextState]);

    const commonTextStyle = {
        alignItems: 'center',
        display: 'flex',
        inset: 0,
        position: 'absolute',
    };

    const topTextStyle = {
        ...commonTextStyle,
        justifyContent: nameJustification,
        textAlign: nameAlignment,
    };

    const bottomTextStyle = {
        ...commonTextStyle,
        justifyContent: seriesJustification,
        textAlign: seriesAlignment,
    };

    if (textGlowIntensity > 0) {
        textStyle.textShadow = `0 0 4px ${textGlow}`;
    }

    return (
        // This is just a div overlaying the frame at inset 0 that acts as a container
        <div
            style={{
                color: textColor,
                fontFamily: `'${fontFamily}'`,
                inset: 0,
                position: 'absolute',
            }}
        >
            {
                topText &&
                <div
                    id='top-text-container'
                    style={{
                        boxSizing: 'border-box',
                        fontSize: `${topTextState.currentSize}%`,
                        height: nameHeight,
                        position: 'absolute',
                        left: nameLeft,
                        top: nameTop,
                        width: nameWidth,
                    }}
                >
                    {/* The text is repeated up to three times for glow intensity purposes */}
                    <div
                        ref={topEl}
                        style={topTextStyle}
                    >
                        {topText}
                    </div>
                    {
                        textGlowIntensity > 1
                        && <div
                            style={topTextStyle}
                        >
                            {topText}
                        </div>
                    }
                    {
                        textGlowIntensity > 2
                        && <div
                            style={topTextStyle}
                        >
                            {topText}
                        </div>
                    }
                </div>
            }
            {
                bottomText &&
                <div
                    id='bottom-text-container'
                    style={{
                        boxSizing: 'border-box',
                        fontSize: `${bottomTextState.currentSize}%`,
                        height: seriesHeight,
                        left: seriesLeft,
                        position: 'absolute',
                        top: seriesTop,
                        width: seriesWidth,
                    }}
                >
                    {/* The text is repeated up to three times for glow intensity purposes */}
                    <div
                        ref={bottomEl}
                        style={bottomTextStyle}
                    >
                        {bottomText}
                    </div>
                    {
                        textGlowIntensity > 1
                        && <div
                            style={bottomTextStyle}
                        >
                            {bottomText}
                        </div>
                    }
                    {
                        textGlowIntensity > 2
                        && <div
                            style={bottomTextStyle}
                        >
                            {bottomText}
                        </div>
                    }
                </div>
            }
        </div>
    );
};
