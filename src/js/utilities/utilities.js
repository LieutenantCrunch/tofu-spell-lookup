const digitsOnlyRegex = /^\d+$/;

export const addUnitsOfMeasurement = (value, units) => digitsOnlyRegex.test(value) ? `${value}${units}` : value;

export const checkAngleSeparation = (angle1, angle2, degreesOfSeparation) => {
    const minAngle = Math.min(angle1, angle2);
    const maxAngle = Math.max(angle1, angle2);

    const positiveDifference = maxAngle - minAngle;
    const negativeDifference = 360 + minAngle - maxAngle;

    return Math.min(positiveDifference, negativeDifference) <= degreesOfSeparation;
};

export const checkValueSeparation = (value1, value2, allowedDifference) => {
    return Math.abs(value1 - value2) <= allowedDifference;
};

export const decToHex = (inputNumber) => {
    return inputNumber.toString(16);
};

// Converts a decimal number representation of a color to its hsl components
// https://css-tricks.com/converting-color-spaces-in-javascript/
export const decToHSLObject = (inputNumber, hueOnly = false) => {
    // First get the hex value as a string, ex: 03F72A
    let hexValue = zeroPad(decToHex(inputNumber), 6);

    // Split into RGB values:
    let red = '0x' + hexValue[0] + hexValue[1];
    let green = '0x' + hexValue[2] + hexValue[3];
    let blue = '0x' + hexValue[4] + hexValue[5];

    // Divide the RGB values by 255 to get values between 0 and 1
    red /= 255;
    green /= 255;
    blue /= 255;

    // Find the minimum and maximum of the three values
    let colorMin = Math.min(red, green, blue);
    let colorMax = Math.max(red, green, blue);
    
    // Get the difference between the minimum and maximum
    let delta = colorMax - colorMin;

    // Use the difference to determine the hue
    let hue = 0,
        saturation = 0,
        lightness = 0;
    
    if (delta === 0) {
        hue = 0;
    }
    else if (colorMax === red) {
        hue = ((green - blue) / delta) % 6;
    }
    else if (colorMax === green) {
        hue = (blue - red) / delta + 2;
    }
    else {
        hue = (red - green) / delta + 4;
    }

    hue = Math.round(hue * 60);

    if (hue < 0) {
        hue += 360;
    }

    if (hueOnly) {
        return hue;
    }

    // Use the minimum and maximum to determine the lightness
    lightness = (colorMax + colorMin) / 2;

    // Use the difference to determine the saturation
    saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    // Unary + operator
    saturation = +(saturation * 100).toFixed(1);
    lightness = +(lightness * 100).toFixed(1);

    return { hue, saturation, lightness };
};

// Converts a decimal number representation of a color to its hsl() representation
export const decToHSLString = (inputNumber) => {
    const hslObject = decToHSLObject(inputNumber);

    return `hsl(${hslObject.hue}, ${hslObject.saturation}%, ${hslObject.lightness}%)`;
};

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Front-pad a string with zeros
export const zeroPad = (inputString, desiredWidth) => {
    // If the desired width is less than or equal to zero, return an empty string
    if (desiredWidth <= 0) {
        return '';
    }
    // Else if the input string is already the desired width (or longer), just return it
    else if (inputString.length >= desiredWidth) {
        return inputString;
    }
    // Else, need to pad it

    // Create an empty array with width + 1 slots and then join the values with '0'
    // The +1 is necessary because the '0's will only go in between the empty slots
    let fullPadding = new Array(1 + desiredWidth).join('0');

    // Combine the full padding and the input string, then slice off desiredWidth starting from the end
    let returnValue = (fullPadding + inputString).slice(-desiredWidth);

    return returnValue;
};
