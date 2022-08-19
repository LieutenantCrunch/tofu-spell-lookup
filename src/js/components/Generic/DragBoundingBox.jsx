import React, { useRef, useState } from 'react';

// Contexts
import { useMiniFrameActiveContext } from '../../contexts/MiniFrameActiveContext';

// Drag & Drop
import { DndContext, DragOverlay, useDroppable } from '@dnd-kit/core';
import { snapCenterToCursor, restrictToWindowEdges } from '@dnd-kit/modifiers';

// MUI
import Box from '@mui/material/Box';

// Other Components
import { MiniFramePreview } from '../Frame/FramePreview';

const DropZone = ({ active, activeStyle, currentParentId, id, style }) => {
    const { isOver, setNodeRef } = useDroppable({
        id
    });

    const currentStyle = isOver 
    ? {
        ...activeStyle,
        ...style
    }
    : style;

    return (
        <div
            ref={setNodeRef}
            style={{
                ...currentStyle,
                borderRadius: '5px',
                boxShadow: isOver ? '0 0 5px 5px rgba(255,255,255,.5), inset 0 0 6px 4px rgba(255,255,255,.25)' : undefined,
            }}
        >
            {
                (active && currentParentId === id) && <MiniFramePreview />
            }
        </div>
    );
};

export const DragBoundingBox = ({}) => {
    const [currentParentId, setCurrentParentId] = useState('top-left-frame-preview');
    const boundingBoxRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);
    const [miniFrameActive] = useMiniFrameActiveContext();
    const validParentIds = ['top-left-frame-preview', 'top-right-frame-preview', 'bottom-frame-preview'];

    const handleDragCancel = (e) => {
        setDragActive(false);
    };

    const handleDragEnd = (e) => {
        setDragActive(false);

        const { over: { id = undefined } = {} } = e;
        const newParentId = (id && validParentIds.includes(id)) ? id : 'top-left-frame-preview';

        setCurrentParentId(newParentId);
    };

    const handleDragStart = (e) => {
        setDragActive(true);
    };

    return (
        <DndContext onDragCancel={handleDragCancel} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            {
                miniFrameActive && 
                <>
                    <Box
                        ref={boundingBoxRef}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            inset: '10px',
                            pointerEvents: 'none', // Prevent the mouse from interacting with this div despite it being on top of the other content
                            position: 'fixed',
                            zIndex: '5000',
                        }}
                    >
                        <DropZone
                            active={!dragActive}
                            activeStyle={{
                                backgroundImage: 'linear-gradient(135deg, rgba(0,255,127,.75), rgba(255,255,255,.25) 30px, rgba(255,255,255,.25))',
                            }}
                            currentParentId={currentParentId}
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
                            active={!dragActive}
                            activeStyle={{
                                backgroundImage: 'linear-gradient(225deg, rgba(0,255,127,.75), rgba(255,255,255,.25) 30px, rgba(255,255,255,.25))',
                            }}
                            currentParentId={currentParentId}
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
                            active={!dragActive}
                            activeStyle={{
                                backgroundImage: 'linear-gradient(45deg, rgba(0,255,127,.75), rgba(255,255,255,.25) 30px, rgba(255,255,255,.25))',
                            }}
                            currentParentId={currentParentId}
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
                    <DragOverlay modifiers={[ snapCenterToCursor, restrictToWindowEdges ]} zIndex={5500}>
                        { dragActive && <MiniFramePreview />}
                    </DragOverlay>
                </>
            }
        </DndContext>
    );
};
