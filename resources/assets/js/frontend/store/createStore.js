import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'

export default (initialState = {}) => {
	// ======================================================
	// Middleware Configuration
	// ======================================================
	const middleware = [thunk]

	// ======================================================
	// Store Enhancers & redux devtools
	// ======================================================
	const enhancers = []

	let composeEnhancers = compose

	if (process.env.NODE_ENV !== 'production') {
		const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		if (typeof composeWithDevToolsExtension === 'function') {
			composeEnhancers = composeWithDevToolsExtension
		}
	}

	// ======================================================
	// Store Instantiation and HMR Setup of reducers
	// ======================================================
	const store = createStore(
		makeRootReducer(),
		initialState,
		composeEnhancers(
			applyMiddleware(...middleware),
			...enhancers
		)
	)
	store.asyncReducers = {}

	if (module.hot) {
		// On HMR, update reducers
		module.hot.accept('./reducers', () => {
			const reducers = require('./reducers').default
			store.replaceReducer(reducers(store.asyncReducers))
		})
	}

	return store
}
