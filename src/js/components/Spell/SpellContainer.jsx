import React from 'react';

import { ColorShiftSection } from './ColorShiftSection';
import { FontSection } from './FontSection';
import { SpecialSection } from './SpecialSection';
import { TextColorSection } from './TextColorSection';

export const SpellContainer = ({ }) => {
    return (
        <div
            style={{
                alignItems: 'flex-start',
                border: 'solid 1px rgba(0,0,0,.25)',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                padding: '1em'
            }}
        >
            <ColorShiftSection />
            <FontSection />
            <SpecialSection />
            <TextColorSection />
        </div>
    );
};