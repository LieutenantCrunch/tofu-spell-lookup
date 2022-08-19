import React from 'react';

// MUI
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// Other Components
import { FramePreview } from './FramePreview';
import { FrameSelect } from './FrameSelect';
import { CardCodeTextField } from './CardCodeTextField';

export const FrameContainer = ({ }) => {
    return (
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                padding: '1em'
            }}
        >
            <FrameSelect />
            <div
                style={{
                    margin: '1em 0',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        height: '450px',
                        position: 'relative',
                        width: '300px'
                    }}
                >
                    {/* This div fills up the space of the FramePreview, so the page won't collapse when the FramePreview is moved out */}
                </div>
                <FramePreview />
            </div>
            <CardCodeTextField
                style={{
                    marginBottom: '1em',
                    width: '50%'
                }}
            />
            <Typography
                sx={{
                    maxWidth: '300px',
                    wordWrap: 'wrap'
                }}
                variant="subtitle2"
            >
                All frame images are property of <Link href="https://top.gg/bot/792827809797898240">Tofu</Link>, images shown here are for demonstration purposes only.
            </Typography>
        </div>
    );
};
