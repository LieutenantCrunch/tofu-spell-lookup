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
const DropZone = ({ currentParent, id, style }) => {
    const { isOver, setNodeRef } = useDroppable({
        id
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                backgroundColor: isOver ? 'rgba(255,255,255,.25)' : undefined,
                boxShadow: isOver ? '0 0 5px 5px rgba(255,255,255,.25)' : undefined,
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
