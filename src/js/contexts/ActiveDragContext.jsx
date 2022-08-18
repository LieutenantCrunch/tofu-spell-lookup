import React, { createContext, useContext, useState } from 'react';

const ActiveDragContext = createContext();

export const ActiveDragContextProvider = ({ children }) => {
    const [dragActive, setDragActive] = useState(false);

    return (
        <ActiveDragContext.Provider value={[dragActive, setDragActive]}>
            {children}
        </ActiveDragContext.Provider>
    );
};

export const useActiveDragContext = () => {
    const context = useContext(ActiveDragContext);

    if (context === undefined) {
        throw new Error('useActiveDragContext must be used within a ActiveDragContextProvider');
    }

    return context;
};
