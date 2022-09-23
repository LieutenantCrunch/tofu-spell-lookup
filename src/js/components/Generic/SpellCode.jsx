import React from 'react';
import { SPELL_PROPERTIES } from '../../utilities/constants';

// Redux
import { useSelector } from 'react-redux';
import { selectHighlightNewSpells, selectHighlightStyle, selectLastVisit } from '../../redux/slices/currentSelections';

// Utilities
import { HIGHLIGHT_NEW_SPELLS_OPTIONS } from '../../utilities/constants';

export const SpellCode = ({ spell }) => {
    const highlightNewSpells = useSelector(selectHighlightNewSpells);
    const highlightStyle = useSelector(selectHighlightStyle);
    const lastVisit = useSelector(selectLastVisit);
    
    let shouldHighlight = false;
    const dateModified = spell[SPELL_PROPERTIES.DATE_MODIFIED];
    const spellWasUsed = spell[SPELL_PROPERTIES.USED];
    let spellDate = Date.parse(dateModified);

    // Not all browsers support the date having the .12345+00 on the end of the of the date, strip that off and replace with Z instead
    if (isNaN(spellDate)) {
        spellDate = Date.parse(`${dateModified.substring(0, dateModified.indexOf('.'))}Z`);
    }

    // TODO: Give them a setting so they can choose not to highlight spells that were used
    // if (!spellWasUsed) {
        switch (highlightNewSpells) {
            case HIGHLIGHT_NEW_SPELLS_OPTIONS.LAST_VISIT.key:
                shouldHighlight = (spellDate > lastVisit);
                break;
            case HIGHLIGHT_NEW_SPELLS_OPTIONS.NO_HIGHLIGHT.key:
                shouldHighlight = false;
                break;
            case HIGHLIGHT_NEW_SPELLS_OPTIONS.PAST_24_HOURS.key:
            default:
                shouldHighlight = (((Date.now() - spellDate) / (1000 * 60 * 60)) <= 24);
                break;
        }
    // }

    return (
        <span
            className={shouldHighlight ? `new-spell-${highlightStyle}` : undefined}
            style={{
                textDecorationColor: 'rgb(255,0,0)',
                WebkitTextDecorationColor: 'rgb(255,0,0)',
                textDecorationLine: (spellWasUsed ? 'line-through' : 'none'),
                WebkitTextDecorationLine: (spellWasUsed ? 'line-through' : 'none'),
                textDecorationThickness: '2px',
                WebkitTextDecorationThickness: '2px',
            }}
        >
            {`%${spell[SPELL_PROPERTIES.SPELL_CODE]}`}
        </span>
    );
};
