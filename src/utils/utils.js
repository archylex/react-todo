/**
 * Generates ID from a timestamp-random number pattern
 *
 * @returns {string} ID
 */
export default function generateId() {
  return `${new Date().getTime()}-${Math.floor(Math.random() * 512)}`;
}

/**
 * Converts date to local string
 *
 * @param {object} date
 * @returns {string} formatted local string
 */
export function toLocalDate(date) {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

/**
 * Clone object
 *
 * @param {object} obj
 * @returns {object} New object
 */
export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Converts empty array to string
 *
 * @param {array} array
 * @returns {array | string}
 */
export function emptyArrayToString(array) {
  return array.length > 0 ? array : "";
}
