import React from 'react';

import { FramePreview } from './FramePreview';
import { FrameSelect } from './FrameSelect';

export const FrameContainer = ({ }) => {
    return (
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                padding: '1em'
            }}
        >
            <FrameSelect />
            <FramePreview />
        </div>
    );
};
