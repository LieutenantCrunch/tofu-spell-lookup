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
    
    let shouldHighlight;
    const spellDate = Date.parse(spell[SPELL_PROPERTIES.DATE_MODIFIED]);

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

    return (
        <span
            className={shouldHighlight ? `new-spell-${highlightStyle}` : undefined}
            style={{
                textDecorationColor: 'rgb(255,0,0)',
                WebkitTextDecorationColor: 'rgb(255,0,0)',
                textDecorationLine: (spell[SPELL_PROPERTIES.USED] ? 'line-through' : 'none'),
                WebkitTextDecorationLine: (spell[SPELL_PROPERTIES.USED] ? 'line-through' : 'none'),
                textDecorationThickness: '2px',
                WebkitTextDecorationThickness: '2px',
            }}
        >
            {`%${spell[SPELL_PROPERTIES.SPELL_CODE]}`}
        </span>
    );
};
