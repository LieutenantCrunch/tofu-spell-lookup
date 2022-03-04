export const checkAngleSeparation = (angle1, angle2, degreesOfSeparation) => {
    const minAngle = Math.min(angle1, angle2);
    const maxAngle = Math.max(angle1, angle2);

    const positiveDifference = maxAngle - minAngle;
    const negativeDifference = 360 + minAngle - maxAngle;

    return Math.min(positiveDifference, negativeDifference) <= degreesOfSeparation;
};
