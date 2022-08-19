import React from 'react';
import { SPELL_PROPERTIES } from '../../utilities/constants';

export const SpellCode = ({ spell }) => {
    return (
        <span
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
