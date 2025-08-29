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



/**
 * translatePoint()
 * @description translate a point by a certain amount
 * @param {Point} point the point to translate
 * @param {Number} translation the amount to translate the point by
 * @returns the new translated point
 */
function translatePoint(point, translation) {
    return {
        x: point.x + translation.x,
        y: point.y + translation.y
    }
}


/**
 * translatePoints()
 * @description translate an array of points by a certain amount
 * @param {Array[Point]} points the points to translate
 * @param {Number} translation the amount to translate the points by
 * @returns the new translated points
 */
function translatePoints(points, translation) {
    let newPoints = [];
    for(const point of points) {
        newPoints.push(translatePoint(point, translation));
    }
    return newPoints;
}

/**
 * lowercaseFirst()
 * @description lowercases the first letter of a string
 * @param {String} str the string to lowercase the first letter of
 * @returns the string with the first letter lowercased
 */
function lowercaseFirst(str) {
  if (!str) return str; // handle empty string
  return str.charAt(0).toLowerCase() + str.slice(1);
}