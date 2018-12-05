import { constants } from 'frontend/actions/Auth'

export const ActionsHandler = {
    [constants.AUTH_REQUEST]: (state, action) => ({
        ...state,
        requesting: true,
        error: '',
    }),
    [constants.AUTH_USER]: (state, action) => ({
        ...state,
        requesting: false,
        check: true,
        user: action.user,
        id: action.user.id,
    }),
    [constants.AUTH_FAIL]: (state, action) => ({
        ...state,
        requesting: false,
        error: action.error,
    }),
    [constants.UNAUTH_USER]: (state, action) => ({
        ...state,
        requesting: false,
        check: false,
        user: null,
        id: 0,
    }),
}

const initialState = {
    requesting: false,
    check: false,
    user: null,
    id: 0,
    error: null,
}

function reducer(state = initialState, action) {
    const handler = ActionsHandler[action.type]
    return handler ? handler(state, action) : state
}

export default reducer
