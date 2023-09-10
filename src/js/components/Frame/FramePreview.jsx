import React, { useEffect, useRef, useState } from 'react';

// Contexts
import { useMiniFrameActiveContext } from '../../contexts/MiniFrameActiveContext';

// Drag & Drop
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// Other Components
import { CharacterSection } from './CharacterSection';
import { ImageSection } from './ImageSection';
import { TextSection } from './TextSection';

// Utilities
import { INTERSECTION_OBSERVER_SUPPORTED } from '../../utilities/constants';

export const FramePreview = ({ }) => {
    const [, setMiniFrameActive] = useMiniFrameActiveContext();
    const staticFrameRef = useRef(null);

    const [inView, setInView] = useState(true);

    // Set up the intersection observer
    const intersectionCB = (entries) => {
        const [ entry ] = entries;
        setInView(entry.isIntersecting);
        setMiniFrameActive(!entry.isIntersecting);
    };

    useEffect(() => {
        if (INTERSECTION_OBSERVER_SUPPORTED) {
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
        }
    }, [staticFrameRef]);

    return (
        <div
            ref={staticFrameRef}
            style={{
                inset: 0,
                position: 'absolute',
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
    const { listeners, setNodeRef, transform } = useDraggable({
        id: 'mini-frame-preview'
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            name="mini-frame-preview"
            {...listeners}
            ref={setNodeRef}
            style={{
                ...style,
                cursor: 'move',
                height: `${450 * 13 / 30}px`,
                pointerEvents: 'auto', // Turn on pointer events so they work since the parent element will have them turned off
                position: 'relative',
                touchAction: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                width: `${300 * 13 / 30}px`,
            }}
        >
            <CharacterSection scale={13 / 30} />
            <ImageSection />
            <TextSection />
        </div>
    );
};
