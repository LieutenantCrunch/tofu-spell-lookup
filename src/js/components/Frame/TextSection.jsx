import React, { useEffect, useRef, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';
import {
    selectCurrentFont,
    selectCurrentFrame,
    selectCurrentName,
    selectCurrentSeries,
    selectCurrentTestFont,
    selectCurrentTextColor
} from '../../redux/slices/currentSelections';

// Utilities
import { SPELL_FONTS, SPELL_PROPERTIES } from '../../utilities/constants';
import { decToHex, zeroPad } from '../../utilities/utilities';

export const TextSection = ({ }) => {
    const MAX_NAME_FONT_SIZE = 250;
    const MAX_SERIES_FONT_SIZE = 200;

    const currentFont = useSelector(selectCurrentFont);
    const currentTestFont = useSelector(selectCurrentTestFont);
    const currentFrame = useSelector(selectCurrentFrame);
    let currentName = useSelector(selectCurrentName);
    let currentSeries = useSelector(selectCurrentSeries);
    const currentTextColor = useSelector(selectCurrentTextColor);

    const textColor = currentTextColor
        ? `#${zeroPad(decToHex(currentTextColor[SPELL_PROPERTIES.VALUE]), 6)}`
        : (
            currentFrame
            ? currentFrame.defaultColor 
            : 'hsl(0,0%,0%)'
        );
    const fontFamily = currentFont
        ? SPELL_FONTS[currentFont[SPELL_PROPERTIES.VALUE]]
        : (
            currentTestFont
            ? currentTestFont
            : (
                currentFrame 
                ? currentFrame.defaultFont 
                : 'SourceSansPro SemiBold'
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
                    fontSize: `${nameState.currentSize}%`,
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
                    fontSize: `${seriesState.currentSize}%`,
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
