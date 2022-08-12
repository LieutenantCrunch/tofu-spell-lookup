import React, { createContext, useContext, useRef } from 'react';

// https://kentcdodds.com/blog/how-to-use-react-context-effectively
const DragBoundingBoxContext = createContext();

export const DragBoundingBoxProvider = ({ children }) => {
    const dragBoundingBox = useRef(null);

    return (
        <DragBoundingBoxContext.Provider value={dragBoundingBox}>
            {children}
        </DragBoundingBoxContext.Provider>
    );
};

export const useDragBoundingBox = () => {
    const context = useContext(DragBoundingBoxContext);

    if (context === undefined) {
        throw new Error('useDragBoundingBox must be used within a DragBoundingBoxProvider');
    }

    return context;
};
