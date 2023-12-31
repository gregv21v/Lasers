/**
 * rotatePoint()
 * @description rotate a point around another point for a certain number of degrees
 * @param {Point} point the point to rotate
 * @param {Number} angle the angle in degrees to rotate the point around
 * @param {Point} origin the other point to rotate point around
 * @returns the new rotated point
 */
function rotatePoint(point, angle, origin) {
    angle = angle * Math.PI / 180.0;
    return {
        x: Math.cos(angle) * (point.x-origin.x) - Math.sin(angle) * (point.y-origin.y) + origin.x,
        y: Math.sin(angle) * (point.x-origin.x) + Math.cos(angle) * (point.y-origin.y) + origin.y
    }
}

/**
 * rotatePoints()
 * @description rotates an array of points around another point by a certain number of degrees.
 * @param {Array[Point]} points the set of points to rotate
 * @param {Number} angle the angle to rotate the points at
 * @param {Point} origin the point to rotate around
 * @returns a new array of rotated points
 */
function rotatePoints(points, angle, origin) {
    let newPoints = [];
    for (const point of points) {
        newPoints.push(rotatePoint(point, angle, origin));
    }
    return newPoints;
}