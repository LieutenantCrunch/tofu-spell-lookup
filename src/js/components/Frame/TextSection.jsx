import React, { useEffect, useRef, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';
import {
    selectCurrentFont,
    selectCurrentFrame,
    selectCurrentName,
    selectCurrentSeries,
    selectCurrentTextColor
} from '../../redux/slices/currentSelections';

export const TextSection = ({ }) => {
    const MAX_NAME_FONT_SIZE = 250;
    const MAX_SERIES_FONT_SIZE = 200;

    const currentFont = useSelector(selectCurrentFont);
    const currentFrame = useSelector(selectCurrentFrame);
    const currentName = useSelector(selectCurrentName);
    const currentSeries = useSelector(selectCurrentSeries);
    const currentTextColor = useSelector(selectCurrentTextColor);

    const textColor = currentTextColor
        ? currentTextColor.value
        : (
            currentFrame
            ? currentFrame.defaultColor 
            : 'hsl(0,0%,0%)'
        );
    const fontFamily = currentFont
        ? currentFont.name
        : (
            currentFrame 
            ? currentFrame.defaultFont 
            : 'Gligoth'
        );

    const nameEl = useRef(null);
    const seriesEl = useRef(null);
    const prevNameFont = useRef(fontFamily);
    const prevSeriesFont = useRef(fontFamily);

    const [nameFontSize, setNameFontSize] = useState(MAX_NAME_FONT_SIZE)
    const [seriesFontSize, setSeriesFontSize] = useState(MAX_SERIES_FONT_SIZE);

    useEffect(() => {
        if (fontFamily && currentName) {
            const testEl = nameEl.current;

            if (fontFamily !== prevNameFont.current) {
                prevNameFont.current = fontFamily;
                setNameFontSize(MAX_NAME_FONT_SIZE);
            }
            else if (testEl && (testEl.offsetHeight < testEl.scrollHeight || testEl.offsetWidth < testEl.scrollWidth)) {
                setNameFontSize(prevSize => prevSize -= 10);
            }
        }
    }, [fontFamily, nameFontSize, currentName]);

    useEffect(() => {
        if (fontFamily && currentSeries) {
            const testEl = seriesEl.current;

            if (fontFamily !== prevSeriesFont.current) {
                prevSeriesFont.current = fontFamily;
                setSeriesFontSize(MAX_SERIES_FONT_SIZE);
            }
            else if (testEl && (testEl.offsetHeight < testEl.scrollHeight || testEl.offsetWidth < testEl.scrollWidth)) {
                setSeriesFontSize(prevSize => prevSize -= 10);
            }
        }
    }, [fontFamily, seriesFontSize, currentSeries]);

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
                ref={nameEl}
                style={{
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    display: 'flex',
                    fontSize: `${nameFontSize}%`,
                    justifyContent: 'center',
                    height: '10%',
                    margin: '5% 12.5% 0',
                    textAlign: 'center'
                }}
            >
                {currentName}
            </div>
            <div
                ref={seriesEl}
                style={{
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    display: 'flex',
                    fontSize: `${seriesFontSize}%`,
                    height: '10%',
                    justifyContent: 'center',
                    margin: '0 12.5% 5%',
                    textAlign: 'center'
                }}
            >
                {currentSeries}
            </div>
        </div>
    );
};
