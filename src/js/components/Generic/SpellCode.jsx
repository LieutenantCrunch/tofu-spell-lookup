import React from 'react';
import { SPELL_PROPERTIES } from '../../utilities/constants';

export const SpellCode = ({ spell }) => {
    return (
        <span
            style={{
                textDecoration: (spell[SPELL_PROPERTIES.USED] ? 'rgb(255,0,0) line-through 2px ' : 'none')
            }}
        >
            {`%${spell[SPELL_PROPERTIES.SPELL_CODE]}`}
        </span>
    );
};
