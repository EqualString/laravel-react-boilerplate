/**
 * Handles the JWT token's presence in session storage.
 * @module utils/TokenHandler
 */

/**
 * Checks if a token is present in session storage.
 * @export
 * @returns {Boolean}
 */
export function isTokenSet() {
    return typeof window.sessionStorage.__jwt === 'string'
}

/**
 * Stores a token in session storage.
 * @export
 * @param {String} token
 */
export function setToken(token) {
    window.sessionStorage.__jwt = token
}

/**
 * Returns a raw JWT token from session storage. Will return `undefined` if no
 * token is set.
 * @export
 * @returns {String}
 */
export function getToken() {
    return window.sessionStorage.__jwt
}

/**
 * Returns JWT auth string with the token. Will return `undefined` if no token
 * is set
 * @export
 * @returns {String}
 */
export function getAuth() {
    return isTokenSet() ? 'Bearer ' + window.sessionStorage.__jwt : undefined
}

/**
 * Removes token from session storage.
 * @export
 */
export function unsetToken() {
    window.sessionStorage.__jwt = undefined
}
