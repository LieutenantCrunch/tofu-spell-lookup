import React from 'react';

// Redux
import { useSelector} from 'react-redux';
import { selectCurrentCharacterImage } from '../../redux/slices/currentSelections';

export const CharacterSection = ({ scale = 1 }) => {
    const currentCharacterImage = useSelector(selectCurrentCharacterImage);

    return (
        currentCharacterImage
        ? <div
            style={{
                backgroundImage: `url("${currentCharacterImage}")`, /* Must use double quotes here because the image url may contain ', such as in KonoSuba */
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                height: `${350 * scale}px`,
                left: '50%',
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${240 * scale}px`,
            }}
        />
        : <></>
    );
};
