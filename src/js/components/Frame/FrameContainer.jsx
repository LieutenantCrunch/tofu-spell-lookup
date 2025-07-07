import React from 'react';

// MUI
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// Other Components
import { FramePreview } from './FramePreview';
import { FrameSelect } from './FrameSelect';
import { CardCodeTextField } from './CardCodeTextField';

export const FrameContainer = () => {
  return (
    <div
      style={{
        flex: '0 0 360px',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '1em',
        overflow: 'hidden'
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
            width: '300px',
            position: 'relative'
          }}
        >
          {/* Spacer for FramePreview */}
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
