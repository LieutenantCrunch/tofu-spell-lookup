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
    let currentName = useSelector(selectCurrentName);
    let currentSeries = useSelector(selectCurrentSeries);
    
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
    const nameOnly = currentFrame ? currentFrame.nameOnly : false;

    // Have to set currentSeries first, since setting currentName first could set it to '', thus causing currentSeries to be '' as well
    currentSeries = nameOnly ? currentName : currentSeries;
    currentName = nameOnly ? '' : currentName;

    const nameEl = useRef(null);
    const seriesEl = useRef(null);

    const [nameState, setNameState] = useState({
        currentSize: MAX_NAME_FONT_SIZE,
        recalculateIndex: 0
    })
    const [seriesState, setSeriesState] = useState({
        currentSize: MAX_SERIES_FONT_SIZE,
        recalculateIndex: 0
    });

    useEffect(() => {
        setNameState(prevState => ({
            currentSize: MAX_NAME_FONT_SIZE,
            recalculateIndex: prevState.recalculateIndex + 1
        }));
    }, [currentName, fontFamily, nameOnly]);

    useEffect(() => {
        setSeriesState(prevState => ({
            currentSize: MAX_SERIES_FONT_SIZE,
            recalculateIndex: prevState.recalculateIndex + 1
        }));
    }, [currentSeries, fontFamily, nameOnly]);

    useEffect(() => {
        if (currentName) {
            const testEl = nameEl.current;

            if (testEl && (testEl.offsetHeight < testEl.scrollHeight || testEl.offsetWidth < testEl.scrollWidth)) {
                setNameState(prevState => ({
                    ...prevState,
                    currentSize: prevState.currentSize - 10
                }));
            }
        }
    }, [currentName, nameState]);

    useEffect(() => {
        if (currentSeries) {
            const testEl = seriesEl.current;

            if (testEl && (testEl.offsetHeight < testEl.scrollHeight || testEl.offsetWidth < testEl.scrollWidth)) {
                setSeriesState(prevState => ({
                    ...prevState,
                    currentSize: prevState.currentSize - 10
                }));
            }
        }
    }, [currentSeries, seriesState]);

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
                    fontSize: `${nameState.currentSize}%`,
                    height: '10%',
                    justifyContent: 'center',
                    margin: '5% 12.5% 0',
                    position: 'relative',
                    textAlign: 'center'
                }}
            >
                <div
                    ref={nameEl}
                    style={textStyle}
                >
                    {currentName}
                </div>
                {
                    textGlowIntensity > 1
                    && <div
                        style={textStyle}
                    >
                        {currentName}
                    </div>
                }
                {
                    textGlowIntensity > 2
                    && <div
                        style={textStyle}
                    >
                        {currentName}
                    </div>
                }
            </div>
            <div
                style={{
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    display: 'flex',
                    fontSize: `${seriesState.currentSize}%`,
                    height: '10%',
                    justifyContent: 'center',
                    margin: '0 12.5% 5%',
                    position: 'relative',
                    textAlign: 'center'
                }}
            >
                <div
                    ref={seriesEl}
                    style={textStyle}
                >
                    {currentSeries}
                </div>
                {
                    textGlowIntensity > 1
                    && <div
                        style={textStyle}
                    >
                        {currentSeries}
                    </div>
                }
                {
                    textGlowIntensity > 2
                    && <div
                        style={textStyle}
                    >
                        {currentSeries}
                    </div>
                }
            </div>
        </div>
    );
};
