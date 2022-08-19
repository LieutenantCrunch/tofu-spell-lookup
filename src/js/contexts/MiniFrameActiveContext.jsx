import React, { createContext, useContext, useState } from 'react';

// https://kentcdodds.com/blog/how-to-use-react-context-effectively
const MiniFrameActiveContext = createContext();

export const MiniFrameActiveContextProvider = ({ children }) => {
    const [miniFrameActive, setMiniFrameActive] = useState(false);

    return (
        <MiniFrameActiveContext.Provider value={[miniFrameActive, setMiniFrameActive]}>
            {children}
        </MiniFrameActiveContext.Provider>
    );
};

export const useMiniFrameActiveContext = () => {
    const context = useContext(MiniFrameActiveContext);

    if (context === undefined) {
        throw new Error('useMiniFrameActiveContext must be used within a MiniFrameActiveContextProvider');
    }

    return context;
};
