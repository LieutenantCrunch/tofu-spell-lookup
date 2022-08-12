import React from 'react';
import { motion } from 'framer-motion';

// Redux
import { useSelector} from 'react-redux';
import { selectCurrentCharacterImage } from '../../redux/slices/currentSelections';

const variants = {
    inView: {
        height: '350px',
        width: '240px',
    },
    outOfView: {
        height: `${350/3}px`,
        width: `${240/3}px`,
    }
};

export const CharacterSection = ({ }) => {
    const currentCharacterImage = useSelector(selectCurrentCharacterImage);

    return (
        currentCharacterImage
        ? <motion.div
            layout
            style={{
                backgroundImage: `url("${currentCharacterImage}")`, /* Must use double quotes here because the image url may contain ', such as in KonoSuba */
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                left: '50%',
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%)',
            }}
            variants={variants}
        />
        : <></>
    );
};
