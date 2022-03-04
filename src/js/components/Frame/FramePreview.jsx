import React from 'react';

import { ImageSection } from './ImageSection';
import { TextSection } from './TextSection';

export const FramePreview = ({ }) => {
    return (
        <div
            style={{
                height: '450px',
                margin: '1em 0',
                position: 'relative',
                width: '300px'
            }}
        >
            <ImageSection />
            <TextSection />
        </div>
    );
};
