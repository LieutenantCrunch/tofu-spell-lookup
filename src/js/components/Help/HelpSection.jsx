import React from 'react';
import { isMobileOnly } from 'react-device-detect';

// MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

// MUI Icons
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

// Other Components
import { SectionControlContainer } from '../StyledMui/SectionControlContainer';

export const HelpSection = ({ }) => {
    return (
        <div
            style={{
                width: '100%'
            }}
        >
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    marginBottom: '1em'
                }}
            >
                <HelpOutlineRoundedIcon
                    style={{
                        padding: '8px'
                    }}
                />
                <Typography
                    variant="h6"
                >
                    Help
                </Typography>
            </div>
            <SectionControlContainer
                sx={{
                    alignItems: 'flex-start',
                    flexDirection: 'column'
                }}
            >
                <Accordion
                    style={{
                        backgroundColor: 'inherit',
                        borderRadius: '4px',
                        marginBottom: '1em',
                        width: '100%'
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreRoundedIcon />}
                    >
                        <Typography>Where do I get the Image Address (URL) for Characters?</Typography>
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
                <Accordion
                    style={{
                        backgroundColor: 'inherit',
                        borderRadius: '4px',
                        width: '100%'
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreRoundedIcon />}
                    >
                        <Typography>What are the differences between this and Tofu?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            component="span"
                        >
                            - Hexes and Auras are not supported<br />
                            - Some fonts render differently, such as Pecita<br />
                            - The text is fit inside the frames differently<br />
                            - The character image does not always fit properly inside the frame<br />
                            - Colors may be somewhat different
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </SectionControlContainer>
        </div>
    );
};
