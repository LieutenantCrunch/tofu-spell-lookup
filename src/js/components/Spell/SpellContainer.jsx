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