import React, { useMemo } from 'react';

// MUI
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// Other Components
import { DialogCloseButton } from '../../Generic/DialogCloseButton';
import { FrameSection } from './FrameSection';

// Redux
import {
    useSelector,
} from 'react-redux';
import {
    selectAllFrames,
} from '../../../redux/slices/frames'

export const FrameDialog = ({
    open,
    onClose,
    onSelect,
}) => {
    const frames = useSelector(selectAllFrames);
    const framesByAlpha = useMemo(() => {
        const frameMapDividedByAlpha = frames.reduce((acc, curr) => {
            const frameName = curr.name;
            const firstLetter = frameName[0].toUpperCase();

            if (!acc.has(firstLetter)) {
                acc.set(firstLetter, [curr]);
            }
            else {
                acc.get(firstLetter).push(curr);
            }

            return acc;
        }, new Map());

        const sortedEntries = [];
        
        frameMapDividedByAlpha.forEach((value, key) => {
            sortedEntries.push([
                key,
                value.sort((a, b) => a.name.localeCompare(b.name)),
            ]);
        })
        const frameMapSortedByAlpha = new Map(sortedEntries.sort(([aKey], [bKey]) => aKey.localeCompare(bKey)));

        return frameMapSortedByAlpha;
    }, [frames]);
    const frameLetters = useMemo(() => Array.from(framesByAlpha.keys()), [framesByAlpha]);

    return (
        <Dialog
            fullWidth
            keepMounted
            maxWidth='lg'
            open={open}
            onClose={onClose}
        >
            <DialogTitle
                style={{
                    paddingBottom: '.5rem',
                    paddingTop: '.5rem',
                }}
            >
                Select a Frame
                <DialogCloseButton onClick={onClose} />
            </DialogTitle>
            <DialogContent
                style={{
                    display: 'flex',
                    gap: '.5rem',
                    flexDirection: 'column',
                }}
            >
                {
                    frameLetters.map((letter) => (
                        <FrameSection
                            key={letter}
                            letter={letter}
                            frames={framesByAlpha.get(letter)}
                        />
                    ))
                }
            </DialogContent>
        </Dialog>
    )
};
