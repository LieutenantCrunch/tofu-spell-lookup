import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

// MUI
import Box from '@mui/material/Box';

// Other Components
import { useDragBoundingBox } from '../Generic/DragBoundingBox';
import { CharacterSection } from './CharacterSection';
import { ImageSection } from './ImageSection';
import { TextSection } from './TextSection';

// Utilities
import { CORNERS } from '../../utilities/constants';

const variants = {
    inView: {
        cursor: 'default',
        height: '450px',
        position: 'absolute',
        width: '300px',
    },
    outOfView: {
        cursor: 'move',
        height: `${450 / 30 * 13}px`,
        position: 'fixed',
        width: `${300 / 30 * 13}px`,
    }
};

export const FramePreview = ({ }) => {
    const dragBoundingBoxRef = useDragBoundingBox();
    const draggableFrameRef = useRef(null);

    const [inView, setInView] = useState(false);

    const handleViewportEnter = (e) => {
        console.log(`${Date.now()} Entered Viewport`);
        setInView(true);
    };

    const handleViewportLeave = (e) => {
        console.log(`${Date.now()} Left Viewport`);
        setInView(false);
    };

    const handleDragEnd = (e) => {
        console.log(`${Date.now()} Drag End`);
        let draggableFrame = draggableFrameRef.current;

        if (e.target?.getBoundingClientRect && draggableFrame) {
            const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            const viewportWidthHalf = viewportWidth / 2;
            const viewportHeightHalf = viewportHeight / 2;

            const { height, left, top, width } = e.target.getBoundingClientRect();
            const verticalMiddle = top + height / 2;
            const horizontalMiddle = left + width / 2;
            
            const isTopHalf = verticalMiddle < viewportHeightHalf;
            const isLeftHalf = horizontalMiddle < viewportWidthHalf;

            let corner = CORNERS.TOP_LEFT;

            if (isTopHalf) {
                if (!isLeftHalf) {
                    corner = CORNERS.TOP_RIGHT;
                }
            }
            else {
                corner = CORNERS.BOTTOM_LEFT; // The settings button is in the bottom right, so they can't end there
            }

            switch (corner) {
                case CORNERS.TOP_RIGHT:
                    draggableFrame.style.bottom = undefined;
                    draggableFrame.style.left = undefined;
                    draggableFrame.style.top = 10;
                    draggableFrame.style.right = 10;
                    break;
                case CORNERS.BOTTOM_LEFT:
                case CORNERS.BOTTOM_RIGHT: // Won't get hit, but if it does, force it to bottom left
                    draggableFrame.style.bottom = 10;
                    draggableFrame.style.left = 10;
                    draggableFrame.style.top = undefined;
                    draggableFrame.style.right = undefined;
                    break;
                case CORNERS.TOP_LEFT:
                default:
                    draggableFrame.style.bottom = undefined;
                    draggableFrame.style.left = 10;
                    draggableFrame.style.top = 10;
                    draggableFrame.style.right = undefined;
                    break;
            }
        }
    };

    return (
        <motion.div
            initial="outOfView"
            onViewportEnter={handleViewportEnter}
            onViewportLeave={handleViewportLeave}
            style={{
                bottom: 0,
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                userSelect: 'none',
                WebkitUserSelect: 'none',
            }}
            viewport={{
                amount: .5,
                fallback: false
            }}
            whileInView="inView"
        >
            {
                (inView || !dragBoundingBoxRef.current)
                ? <div
                    style={{
                        height: '450px',
                        left: 0,
                        position: 'absolute',
                        top: 0,
                        width: '300px',
                    }}
                >
                    <CharacterSection />
                    <ImageSection />
                    <TextSection />
                </div>
                : createPortal(<motion.div
                    drag
                    dragConstraints={dragBoundingBoxRef}
                    dragPropagation
                    dragSnapToOrigin
                    layout
                    onDragEnd={handleDragEnd}
                    ref={draggableFrameRef}
                    style={{
                        pointerEvents: 'auto', // Turn on pointer events so they work since the parent element will have them turned off
                    }}
                    variants={variants}
                >
                    <CharacterSection />
                    <ImageSection />
                    <TextSection />
                </motion.div>, dragBoundingBoxRef.current)
            }
        </motion.div>
    );
};
