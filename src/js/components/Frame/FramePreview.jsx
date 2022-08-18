import React, { useEffect, useRef, useState } from 'react';

// Contexts
import { useActiveDragContext } from '../../contexts/ActiveDragContext';

// Drag & Drop
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// Other Components
import { CharacterSection } from './CharacterSection';
import { ImageSection } from './ImageSection';
import { TextSection } from './TextSection';

export const FramePreview = ({ }) => {
    const [, setDragActive] = useActiveDragContext();
    const staticFrameRef = useRef(null);

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
