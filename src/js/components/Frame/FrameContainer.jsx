import React from 'react';

import { FramePreview } from './FramePreview';
import { FrameSelect } from './FrameSelect';

export const FrameContainer = ({ }) => {
    return (
        <div
            style={{
                alignItems: 'center',
                border: 'solid 1px rgba(0,0,0,.25)',
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
