/**
 * Use this when u wish to create reducer
 * @param {*} handlers
 * @param {*} initialState
 */
export function createReducer(handlers = {}, initialState = {}) {
    return function reduce(state = initialState, action) {
        const handler = handlers[action.type]
        return typeof handler === 'function' ? handler(state, action) : state
    }
}
