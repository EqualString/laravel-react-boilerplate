import * as constants from './constants'

// @todo standardize

export const authRequest = (data) => ({
    type: constants.AUTH_REQUEST,
})

export const authSuccess = (user) => ({
    type: constants.AUTH_USER,
    user,
})

export const authFailure = (error) => ({
    type: constants.AUTH_FAIL,
    error,
})

export const unauth = () => ({
    type: constants.UNAUTH_USER,
})

/**
 * JWT actions.
 */

 /**
  * Denotes a failure to perform the `getJWT` request.
  * @export
  * @param {Object} error
  * @returns {Object}
  */
export function getJwtFailure(error) {
    return {
        type: constants.GET_JWT_FAILURE,
        payload: { error },
    }
}

/**
 * Denotes a `getJWT` request.
 * @export
 * @returns {Object}
 */
export function getJwtRequest() {
    return {
        type: constants.GET_JWT_REQUEST,
    }
}

/**
 * Denotes a successful performance of the `getJWT` request.
 * @export
 * @param {String} token
 * @returns {Object}
 */
export function getJwtSuccess(token) {
    return {
        type: constants.GET_JWT_SUCCESS,
        payload: { token },
    }
}

/**
 * Denotes that the request is waiting to be made.
 * @export
 * @returns {Object}
 */
export function getJwtWaiting() {
    return {
        type: constants.GET_JWT_WAITING,
    }
}

/**
 * Denotes that the JWT token has been set.
 * @export
 * @param {String} token
 * @returns {Object}
 */
export function setJwt(token) {
    return {
        type: constants.SET_JWT,
        payload: { token },
    }
}
