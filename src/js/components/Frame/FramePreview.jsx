import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { motion } from 'framer-motion';

// Contexts
import { useActiveDragContext } from '../../contexts/ActiveDragContext';
import { useDragBoundingBox } from '../Generic/DragBoundingBox';

// Drag & Drop
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// MUI
import Box from '@mui/material/Box';

// Other Components
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
    const [, setDragActive] = useActiveDragContext();
    const dragBoundingBoxRef = useDragBoundingBox();
    const staticFrameRef = useRef(null);
    const draggableFrameRef = useRef(null);

    const [inView, setInView] = useState(false);

    // Set up the intersection observer
    const intersectionCB = (entries) => {
        const [ entry ] = entries;
        setInView(entry.isIntersecting);
        setDragActive(!entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(intersectionCB, {
            threshold: .5
        });

        if (staticFrameRef.current) {
            observer.observe(staticFrameRef.current);
        }

        return () => {
            if (staticFrameRef.current) {
                observer.unobserve(staticFrameRef.current);
            }
        }
    }, [staticFrameRef]);

    // Set up the drag handling
    const getFinalCoords = () => {
        let draggableFrame = draggableFrameRef.current;

        let corner = CORNERS.TOP_LEFT;

        if (draggableFrame?.getBoundingClientRect) {
            const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            const viewportWidthHalf = viewportWidth / 2;
            const viewportHeightHalf = viewportHeight / 2;

            const { height, left, top, width } = draggableFrame.getBoundingClientRect();
            const verticalMiddle = top + height / 2;
            const horizontalMiddle = left + width / 2;
            
            const isTopHalf = verticalMiddle < viewportHeightHalf;
            const isLeftHalf = horizontalMiddle < viewportWidthHalf;

            if (isTopHalf) {
                if (!isLeftHalf) {
                    corner = CORNERS.TOP_RIGHT;
                }
            }
            else {
                corner = CORNERS.BOTTOM_LEFT; // The settings button is in the bottom right, so they can't end there
            }
        }

        switch (corner) {
        case CORNERS.TOP_RIGHT:
            return {
                bottom: 'auto',
                left: 'auto',
                right: 10,
                top: 10,
            };
        case CORNERS.BOTTOM_LEFT:
        case CORNERS.BOTTOM_RIGHT: // Won't get hit, but if it does, force it to bottom left
            return {
                bottom: 10,
                left: 10,
                right: 'auto',
                top: 'auto',
            };
        case CORNERS.TOP_LEFT:
        default:
            return {
                bottom: 'auto',
                left: 10,
                right: 'auto',
                top: 10,
            };
        }
    };

    const [{ bottom, left, right, top }, api] = useSpring(() => ({ bottom: 'auto', left: 10, right: 'auto', top: 10 }));
    const bind = useDrag(({ down, offset: [ox, oy] }) => {
        if (down) {
            // immediate: true prevents animation, so it should just follow the mouse
            api.start({ left: ox, top: oy, immediate: true});
        }
        else {
            api.stop();
            api.start(getFinalCoords());
        }
    }, {
        bounds: dragBoundingBoxRef,
        filterTaps: true,
    });

    return (
        <div
            ref={staticFrameRef}
            style={{
                bottom: 0,
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                userSelect: 'none',
                WebkitUserSelect: 'none',
            }}
        >
            {
                inView &&
                <div
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
            }
            {/*
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
                : createPortal(<animated.div
                    {...bind()}
                    ref={draggableFrameRef}
                    style={{
                        cursor: 'move',
                        height: `${450 / 30 * 13}px`,
                        pointerEvents: 'auto', // Turn on pointer events so they work since the parent element will have them turned off
                        position: 'fixed',
                        touchAction: 'none',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        width: `${300 / 30 * 13}px`,
                        bottom,
                        left,
                        right,
                        top,
                    }}
                >
                    <CharacterSection />
                    <ImageSection />
                    <TextSection />
                </animated.div>, dragBoundingBoxRef.current)
            */}
        </div>
    );
};

export const MiniFramePreview = ({ }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'mini-frame-preview'
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            {...attributes}
            {...listeners}
            ref={setNodeRef}
            style={{
                ...style,
                cursor: 'move',
                height: `${450 / 30 * 13}px`,
                pointerEvents: 'auto', // Turn on pointer events so they work since the parent element will have them turned off
                position: 'relative',
                touchAction: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                width: `${300 / 30 * 13}px`,
                zIndex: 5000,
            }}
        >
            <CharacterSection />
            <ImageSection />
            <TextSection />
        </div>
    );
};
