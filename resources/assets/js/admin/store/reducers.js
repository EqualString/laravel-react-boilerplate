import { combineReducers } from 'redux'
import auth from 'admin/reducers/AuthentificationReducer'
import { reducer as formReducer } from 'redux-form'

/**
 * Insert here any 'static' created reducers
 * @param {*} asyncReducers
 */
export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        auth,
        form: formReducer,
        ...asyncReducers,
    })
}

/**
 * Use this function if you wish to insert any reducer to store
 * For example in route onEnter function
 * @param {*} store
 */
export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

    store.asyncReducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
