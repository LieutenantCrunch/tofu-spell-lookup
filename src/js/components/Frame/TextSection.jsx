import React, { useEffect, useRef, useState } from 'react';

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

export const TextSection = ({ }) => {
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
                ? currentFrame.defaultFont 
                : 'D-DIN Condensed Bold'
            )
        );
    const nameOnly = !!currentFrame?.nameOnly;
    const nameOnlyOnTop = !!currentFrame?.nameOnlyOnTop;

    // Have to set currentSeries first, since setting currentName first could set it to '', thus causing currentSeries to be '' as well
    let topText = currentName;
    let bottomText = currentSeries;

    if (nameOnly) {
        if (nameOnlyOnTop) {
            bottomText = '';
        }
        else {
            topText = '';
            bottomText = currentName;
        }
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
    }, [topText, fontFamily, nameOnly, nameOnlyOnTop]);

    // Trigger a recalculate when any property changes that could affect the bottom text
    useEffect(() => {
        setBottomTextState(prevState => ({
            currentSize: MAX_SERIES_FONT_SIZE,
            recalculateIndex: prevState.recalculateIndex + 1
        }));
    }, [bottomText, fontFamily, nameOnly, nameOnlyOnTop]);

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

    const textStyle = {
        alignItems: 'center',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        textAlign: 'center',
        top: 0
    };

    if (textGlowIntensity > 0) {
        textStyle.textShadow = `0 0 4px ${textGlow}`;
    }

    return (
        <div
            style={{
                bottom: 0,
                color: textColor,
                display: 'flex',
                flexDirection: 'column',
                fontFamily: `'${fontFamily}'`,
                justifyContent: 'space-between',
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0
            }}
        >
            <div
                style={{
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    display: 'flex',
                    fontSize: `${topTextState.currentSize}%`,
                    height: '10%',
                    justifyContent: 'center',
                    margin: '5% 12.5% 0',
                    position: 'relative',
                    textAlign: 'center'
                }}
            >
                <div
                    ref={topEl}
                    style={textStyle}
                >
                    {topText}
                </div>
                {
                    textGlowIntensity > 1
                    && <div
                        style={textStyle}
                    >
                        {topText}
                    </div>
                }
                {
                    textGlowIntensity > 2
                    && <div
                        style={textStyle}
                    >
                        {topText}
                    </div>
                }
            </div>
            <div
                style={{
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    display: 'flex',
                    fontSize: `${bottomTextState.currentSize}%`,
                    height: '10%',
                    justifyContent: 'center',
                    margin: '0 12.5% 5%',
                    position: 'relative',
                    textAlign: 'center'
                }}
            >
                <div
                    ref={bottomEl}
                    style={textStyle}
                >
                    {bottomText}
                </div>
                {
                    textGlowIntensity > 1
                    && <div
                        style={textStyle}
                    >
                        {bottomText}
                    </div>
                }
                {
                    textGlowIntensity > 2
                    && <div
                        style={textStyle}
                    >
                        {bottomText}
                    </div>
                }
            </div>
        </div>
    );
};
