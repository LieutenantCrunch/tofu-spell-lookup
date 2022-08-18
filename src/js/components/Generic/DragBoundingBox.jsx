import React, { createContext, useContext, useRef, useState } from 'react';

// Contexts
import { useActiveDragContext } from '../../contexts/ActiveDragContext';

// Drag & Drop
import { DndContext, DragOverlay, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// MUI
import Box from '@mui/material/Box';

// Other Components
import { MiniFramePreview } from '../Frame/FramePreview';

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

const DropZone = ({ currentParent, id, style }) => {
    const { isOver, setNodeRef } = useDroppable({
        id
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                boxShadow: isOver ? '0 0 5px 5px white' : undefined
            }}
        >
            {
                (currentParent === id) && <MiniFramePreview />
            }
        </div>
    );
};

export const DragBoundingBox = ({}) => {
    const [currentParent, setCurrentParent] = useState('top-left-frame-preview');
    const [active, setActive] = useState(false);
    const [dragActive] = useActiveDragContext();
    const dragBoundingBoxRef = useDragBoundingBox();

    const handleDragEnd = (e) => {
        setActive(false);

        const { over } = e;
        
        const newParent = over ? over.id : 'top-left-frame-preview';

        setCurrentParent(newParent);
    };

    const handleDragStart = (e) => {
        setActive(true);
    };

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            {
                dragActive && 
                <>
                    <Box
                        ref={dragBoundingBoxRef}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            inset: '10px',
                            pointerEvents: 'none', // Prevent the mouse from interacting with this div despite it being on top of the other content
                            position: 'fixed',
                            zIndex: 'tooltip',
                        }}
                    >
                        <DropZone
                            currentParent={currentParent}
                            id="top-left-frame-preview"
                            style={{
                                alignItems: 'flex-start',
                                backgroundColor: 'rgba(255,0,0,.5)',
                                display: 'flex',
                                flexBasis: '50%',
                                height: '50%',
                                justifyContent: 'flex-start',
                            }}
                        />
                        <DropZone
                            currentParent={currentParent}
                            id="top-right-frame-preview"
                            style={{
                                alignItems: 'flex-start',
                                backgroundColor: 'rgba(0,255,0,.5)',
                                display: 'flex',
                                flexBasis: '50%',
                                height: '50%',
                                justifyContent: 'flex-end',
                            }}
                        />
                        <DropZone
                            currentParent={currentParent}
                            id="bottom-frame-preview"
                            style={{
                                alignItems: 'flex-end',
                                backgroundColor: 'rgba(0,0,255,.5)',
                                display: 'flex',
                                flexBasis: '100%',
                                height: '50%',
                                justifyContent: 'flex-start',
                            }}
                        />
                    </Box>
                    <DragOverlay>
                        { active && <MiniFramePreview />}
                    </DragOverlay>
                </>
            }
        </DndContext>
    );
};
