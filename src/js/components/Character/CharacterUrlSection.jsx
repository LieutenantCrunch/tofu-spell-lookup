import React from 'react';
import { isMobileOnly } from 'react-device-detect';

// MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

// Other Components
import { CharacterUrlTextField } from './CharacterUrlTextField';
import { SectionControlContainer } from '../StyledMui/SectionControlContainer';

// Redux
import { useDispatch } from 'react-redux';
import { setCurrentCharacterImage } from '../../redux/slices/currentSelections';

export const CharacterUrlSection = ({ }) => {
    const dispatch = useDispatch();

    const handleClearClick = (e) => {
        dispatch(setCurrentCharacterImage(undefined));
    };

    return (
        <div
            style={{
                width: '100%'
            }}
        >
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex'
                }}
            >
                <Typography
                    variant="h6"
                >
                    Character
                </Typography>
                <IconButton
                    aria-label="clear character"
                    color="error"
                    onClick={handleClearClick}
                    title="Clear Character"
                >
                    <ClearRoundedIcon />
                </IconButton>
            </div>
            <SectionControlContainer
                sx={{
                    alignItems: 'flex-start',
                    flexDirection: 'column'
                }}
            >
                <CharacterUrlTextField
                    sx={{
                        flexGrow: 0,
                        marginBottom: '1em',
                        width: '66%'
                    }}
                />
                <Accordion
                    style={{
                        backgroundColor: 'inherit',
                        borderRadius: '4px',
                        flexGrow: 0,
                        marginBottom: '1em'
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreRoundedIcon />}
                    >
                        <Typography>What Is This?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            component="span"
                        >
                            - Use the <code sx={{ bgcolor: '#000000' }}>tlu</code> command to look up a character<br />
                            {`- ${isMobileOnly ? 'Tap' : 'Click'} on the character's image`}<br />
                            {
                                isMobileOnly
                                ? <>
                                    - Tap <strong>Yep!</strong> to visit the link<br />
                                    - Long-press on the address at the top and a Copy button should appear<br />
                                    - Tap Copy<br />

                                </>
                                : <>
                                    - Click <strong>Open original</strong> below the image<br />
                                    - Copy the web address of the image (<small style={{ fontStyle: 'italic' }}>http://blahblah/blah.png</small>) from your browser<br />
                                </>
                            }
                            - Paste the address into the textbox below
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </SectionControlContainer>
        </div>
    );
};
